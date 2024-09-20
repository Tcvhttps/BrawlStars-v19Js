const PiranhaMessage = require('../PiranhaMessage')
const ByteStream = require("../../ByteStream")
const database = require("../../database/db")
const Events = require('../../Logic/Events');

class LogicClaimDailyRewardCommand extends PiranhaMessage{
    constructor(bytes, session){
        super(bytes)
        this.session = session;
        this.commandID = 503
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
        this.b1 = this.stream.readVInt()
        this.b2 = this.stream.readVInt()
        this.b3 = this.stream.readVInt()
        this.b4 = this.stream.readVInt()
    }

    async process(){
        const EventsInstance = new Events();// Call events

        const account = database.getAccount(this.session.token);// Get plrData
        const data = EventsInstance.addTokenById(this.b4-1, account.lowID);//Search Event
        account.Box = account.Box + data.reward;// Logic Plus
        database.replaceValue(account.lowID, 'Box', account.Box);// Give
    }}

module.exports = LogicClaimDailyRewardCommand