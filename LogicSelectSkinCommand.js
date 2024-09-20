const PiranhaMessage = require('../PiranhaMessage')
const ByteStream = require("../../ByteStream")
const database = require("../../database/db")

class LogicSelectSkinCommand extends PiranhaMessage{
    constructor(bytes, session){
        super(bytes)
        this.session = session;
        this.commandID = 506
        this.version = 0        
        this.stream = new ByteStream(bytes);

    }

    decode(self){
        this.stream.readVInt()
        this.stream.readVInt()
        this.stream.readVInt()
        this.stream.readVInt()
        this.stream.readVInt()
        this.stream.readVInt()
        this.stream.readVInt()
        this.stream.readVInt()
        this.stream.readVInt()
        this.stream.readVInt()
        this.skinID = this.stream.readVInt();
        this.stream.readVInt()
        this.stream.readVInt()
        this.stream.readVInt()
        this.stream.readVInt()
        this.stream.readVInt()
        this.stream.readVInt()
        this.BrawlerID = this.stream.readVInt();
    }

    async process(){
        const account = database.getAccount(this.session.token)
        database.replaceValue(account.lowID, 'SkinID', this.skinID);
        database.replaceValue(account.lowID, 'BrawlerID', this.BrawlerID);

}
}
module.exports = LogicSelectSkinCommand