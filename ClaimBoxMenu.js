const PiranhaMessage = require('../PiranhaMessage');
const ByteStream = require("../../ByteStream");
const LogicBoxCommand = require('./LogicBoxCommand');
const database = require('../../database/db')

class ClaimBoxMenu extends PiranhaMessage{
    constructor(bytes, session){
        super(bytes)
        this.session = session;
        this.commandID = 500
        this.version = 0        
        this.stream = new ByteStream(bytes);
    }

    decode(self){
        this.a1 = this.stream.readVInt()
        this.a2 = this.stream.readVInt()
        this.a3 = this.stream.readVInt()
        this.a4 = this.stream.readVInt()
        this.a5 = this.stream.readVInt()
        this.a6 = this.stream.readVInt()
        this.a7 = this.stream.readVInt()
        this.a8 = this.stream.readVInt()
        this.a9 = this.stream.readVInt()
        this.a10 = this.stream.readVInt()
    }

    async process(){
        const account = database.getAccount(this.session.token)
        let boxtype = 10;
        switch (this.a10) {
            case 5:// Box
                database.replaceValue(account.lowID, 'Box', account.Box-100)
                boxtype = 10
              break;

            case 4:// BigBox
                database.replaceValue(account.lowID, 'BigBox', account.BigBox-10)
                boxtype = 12
              break;

            case 3:// MEGA
                database.replaceValue(account.lowID, 'Gems', account.Gems - 80)
                boxtype = 11
              break;

            case 1:// BigBox
                database.replaceValue(account.lowID, 'Gems', account.Gems - 30)
                boxtype = 12
              break;

          }
          new LogicBoxCommand(this.session,boxtype,account).send()
    }}

module.exports = ClaimBoxMenu