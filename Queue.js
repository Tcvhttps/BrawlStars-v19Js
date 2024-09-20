class Queue {
    QUEUE_FREE = 0
    QUEUE_BUSY = 1
    QUEUE_OVERFILLED = 2
    QUEUE_PUSHED_MORE_THAN_EXPECTED = 3
    QUEUE_DETECTED_MERGED_PACKETS = 4
    
    originalMerged = ""

    constructor (maxQueueSize, disableQueuebugtxtFile) {
        this.data = Buffer.alloc(0)
        this.maxQueueSize = maxQueueSize
        this.state = this.QUEUE_FREE
        this.unmergedPackets = []
        this.disableQueuebugtxtFile = disableQueuebugtxtFile
    }

    push (bytes) {
        this.data = Buffer.concat([this.data, bytes])

        this.state = this.QUEUE_BUSY

        if (this.size() > this.maxQueueSize && this.maxQueueSize > 0) {
            this.state = this.QUEUE_OVERFILLED
        }

        if (this.size() - 7 > this.getQueueExpectedSize()) {
            this.originalMerged = this.data.toString("hex").toUpperCase().match(/.{0,2}/g).filter(e => e != "").join("")
            const isPacketsBeenMerged = this.unmerge(this.data, 0)

            this.state = isPacketsBeenMerged ? this.QUEUE_DETECTED_MERGED_PACKETS : this.QUEUE_PUSHED_MORE_THAN_EXPECTED
        }
    }

    release () {
        const returnableData = this.unmergedPackets.length != 0 ? this.unmergedPackets : this.data 

        this.data = Buffer.alloc(0)
        this.state = this.QUEUE_FREE
        this.unmergedPackets = []
        this.originalMerged = ""

        return returnableData
    }

    isBusy () {
        if (this.size() === 0) return false;
        return this.getQueueExpectedSize() > this.size() - 7
    }

    getQueueExpectedSize () {
        return this.data.readUIntBE(2, 3)
    }

    size () {
        return this.data.length
    }

    unmerge (bytes, leng) {
        if (bytes.length < 7) return false;
        const packetBytes = bytes.slice(leng)
        const packetId = packetBytes.readUInt16BE(0)
        const newLength = packetBytes.readUIntBE(2, 3)

        if (packetId < 10100 || packetId >= 20000) {
            if (!this.disableQueuebugtxtFile) {
                Warn("Please, report queuebug.txt file to https://github.com/tailsjs/nodebrawl-core/issues/new")
                require("fs").writeFileSync("./queuebug.txt", this.originalMerged)
                Fatal("Server is off...")
            }

            return false
        }

        if (packetBytes.slice(7).length > newLength) {
            this.unmerge(packetBytes.slice(7), newLength)
        }

        const header = {
            id: packetBytes.readUInt16BE(0),
            len: packetBytes.readUIntBE(2, 3),
            version: packetBytes.readUInt16BE(5)
        }

        header.bytes = packetBytes.slice(7, header.len + 7)

        this.unmergedPackets.unshift(header)

        return true
    }
}

module.exports = Queue