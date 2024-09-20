const Utils = require("./ByteArray");

class BitStream {
    constructor(data) {
        this.buffer = data == null ? new Buffer.alloc(0) : data;
        this.offset = 0;
        this.bitOffset = 0;
    }

    readBit() {
        if (this.offset > this.buffer.length) {
            return 0;
        }

        let value = ((this.buffer[this.offset] >> this.bitOffset) & 1);
        this.bitOffset++;
        if (this.bitOffset == 8) {
            this.bitOffset = 0;
            this.offset += 1;
        }

        return value;
    }

    readBytes(length) {
        const data = [];
        let i = 0;
    
        while (i < length) {
          let value = 0;
          let p = 0;
    
          while (p < 8 && i < length) {
            value |= this.readBit() << p;
            i += 1;
            p += 1;
          }
    
          data.push(value);
        }
    
        return Buffer.from(data);
      }
    
      readPositiveInt(bitsCount) {
        const data = this.readBytes(bitsCount);
        return data.readUIntLE(0, data.length);
      }
    readBoolean() {
        return this.readPositiveInt(1) == 1;
      }
    readInt(bits) {
        let v2 = 2 * this.readPositiveInt(1) - 1;
        let res = v2 * this.readPositiveInt(bits);
        return res
    }

    readPositiveVIntMax255() {
        let v2 = this.readPositiveInt(3);
        return this.readPositiveInt(v2);
    }
    // Write region
	writePVIntMax65535OZ(data){
	if (data == 0){
		this.writePositiveInt(1, 1)
		return
        }
    this.writePositiveInt(0, 1)
	this.writePositiveVInt(data, 4)
    }
    writeBit(data) {
        if (this.bitOffset == 0) {
            this.offset += 1;
            this.writeByte(0xFF);
        }

        var value = this.buffer[this.offset-1];
        value &= ~(1 << this.bitOffset);
        value |= (data << this.bitOffset)
        this.buffer[this.offset - 1] = value;
        this.bitOffset = (this.bitOffset + 1) % 8;
    }
    writeBoolean(value) {
        if (value) {
        this.writePositiveInt(1, 1);
        }
        else {
        this.writePositiveInt(0, 1);
        }
    }
    writeBits(bits, count) {
        var position = 0;
        for (var i = 0; i < count;){ 
            var value;
            for (var p = 0; p < 8 && i < count; i++, p++) {
                value = ((bits[position] >> p) & 1);
                this.writeBit(value);
            }
            position++;
        }
    }

    writePositiveInt(value, bits) {
        this.writeBits(Utils.intToBytes(value), bits);
    }

    writeInt(value, bits) {
        var val = value;
        if (val <= -1) {
        this.writePositiveInt(0, 1);
            val = -value;
        }
        else if (val >= 0) {
        this.writePositiveInt(1, 1);
            val = value;
        }

        this.writePositiveInt(val, bits);
    }

    writePositiveVInt(value, bits) {
        var v3 = 1;
        var v7 = value;

        if (v7 != 0) {
            if (v7 < 1) {
                v3 = 0;
            }
            else {
                var v8 = v7;
                v3 = 0;
                do {
                    v3 += 1;
                    v8 >>= 1;
                }
                while (v8 != 0);
            }
        }

        this.writePositiveInt(v3 - 1, bits);
        this.writePositiveInt(v7, v3);
    }

    writeByte(value) {
        this.ensureCapacity(1);
        this.buffer[this.offset-1] = value;
    }

    ensureCapacity(capacity) {
        var bufferLength = this.buffer.length;

        if (this.offset + capacity > bufferLength) {
            var tmpBuffer = new Buffer.alloc(capacity);
            this.buffer = Buffer.concat([this.buffer, tmpBuffer]);
        }
    }
    writePositiveVIntMax255(value){
        this.writePositiveVInt(value, 3)
    }
    writePositiveVIntMax255OftenZero(a1){
        if(a1 == 0){
        this.writePositiveInt(1, 1)
            return;
        }
        this.writePositiveInt(0, 1)
        this.writePositiveVInt(a1, 3)
    }


    writePositiveIntMax1(value){
        this.writePositiveInt(value, 1)
    }

    writePositiveIntMax3(value){
        this.writePositiveInt(value, 2)
    }

    writePositiveIntMax7(value){
        this.writePositiveInt(value, 3)
    }

    WritePositiveIntMax15(value){
        this.writePositiveInt(value, 4)
    }

    WritePositiveIntMax31(value){
        this.writePositiveInt(value, 5)
    }

    WritePositiveIntMax63(value){
        this.writePositiveInt(value, 6)
    }

    writePositiveIntMax127(value){
        this.writePositiveInt(value, 7)
    }

    writePositiveIntMax255(value){
        this.writePositiveInt(value, 8)
    }

    writePositiveIntMax511(value){
        this.writePositiveInt(value, 9)
    }

    writePositiveIntMax1023(value){
        this.writePositiveInt(value, 10)
    }

    writePositiveIntMax2047(value){
        this.writePositiveInt(value, 11)
    }

    WritePositiveIntMax4095(value){
        this.writePositiveInt(value, 12)
    }

    writePositiveIntMax8191(value){
        this.writePositiveInt(value, 13)
    }

    writePositiveIntMax16383(value){
        this.writePositiveInt(value, 14)
    }

    writePositiveIntMax32767(value){
        this.writePositiveInt(value, 15)
    }

    writePositiveIntMax65535(value){
        this.writePositiveInt(value, 16)
    }

    writePositiveIntMax131071(value){
        this.writePositiveInt(value, 17)
    }

    writePositiveIntMax262143(value){
        this.writePositiveInt(value, 18)
    }

    writePositiveIntMax524287(value){
        this.writePositiveInt(value, 19)
    }

    writePositiveIntMax1048575(value){
        this.writePositiveInt(value, 20)
    }

    writePositiveIntMax2097151(value){
        this.writePositiveInt(value, 21)
    }

    writePositiveIntMax4194303(value){
        this.writePositiveInt(value, 22)
    }

    writeIntMax1(value){
        this.writeInt(value, 1)
    }

    writeIntMax3(value){
        this.writeInt(value, 2)
    }

    WriteIntMax7(value){
        this.writeInt(value, 3)
    }

    writeIntMax15(value){
        this.writeInt(value, 4)
    }

    writeIntMax31(value){
        this.writeInt(value, 5)
    }

    writeIntMax63(value){
        this.writeInt(value, 6)
    }

    writeIntMax127(value){
        this.writeInt(value, 7)
    }

    writeIntMax2047(value){
        this.writeInt(value, 11)
    }

    writeIntMax16383(value){
        this.writeInt(value, 14)
    }

    writeIntMax65535(value){
        this.writeInt(value, 16)
    }

    getBuff(){
        return this.buffer
    }


}

module.exports = BitStream;
