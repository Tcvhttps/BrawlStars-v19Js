

const PiranhaMessage = require('../PiranhaMessage')
const ByteStream = require("../../ByteStream")
const database = require("../../database/db")
const Events = require('../../Logic/Events');

class LogicPurchaseDoubleCoinsCommand extends PiranhaMessage{
    constructor(bytes, session){
        super(bytes)
        this.session = session;
        this.commandID = 509
        this.version = 0        
        this.stream = new ByteStream(bytes);
    }

    decode(self){
        // idk
    }

    async process(){
        const account = database.getAccount(this.session.token)
        database.replaceValue(account.lowID, 'TokensDoubler', account.TokensDoubler+1000);// Give
        database.replaceValue(account.lowID, 'Gems', account.Gems-50);// Remove
    }}

module.exports = LogicPurchaseDoubleCoinsCommand