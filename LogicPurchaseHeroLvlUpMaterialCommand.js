

const PiranhaMessage = require('../PiranhaMessage')
const ByteStream = require("../../ByteStream")
const database = require("../../database/db")
const Events = require('../../Logic/Events');

class LogicPurchaseHeroLvlUpMaterialCommand extends PiranhaMessage{
    constructor(bytes, session){
        super(bytes)
        this.session = session;
        this.commandID = 521
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
        this.GoldType = this.stream.readVInt()
        
    }

    async process(){
        let Gold;
        let Gems;
        const account = database.getAccount(this.session.token)
        if (this.GoldType === 0){
            Gold = 150;
            Gems = 20;
        }
        if (this.GoldType === 1){
            Gold = 400;
            Gems = 50;
        }
        if (this.GoldType === 2){
            Gold = 1200;
            Gems = 140;
        }
        if (this.GoldType === 3){
            Gold = 2600;
            Gems = 280;
        }
        database.replaceValue(account.lowID, 'Gems', account.Gems-Gems);// Remove
        database.replaceValue(account.lowID, 'Gold', account.Gold-Gold);// Add
    }}

module.exports = LogicPurchaseHeroLvlUpMaterialCommand