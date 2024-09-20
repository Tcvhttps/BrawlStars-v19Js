const PiranhaMessage = require('../PiranhaMessage');
const ByteStream = require('../../ByteStream');
const database = require('../../database/db');
const Shop = require('../../Logic/Shop');
const LogicBoxCommand = require('./LogicBoxCommand');
const LogicShopCommand = require('./LogicShopCommand');

class LogicPurchaseOfferCommand extends PiranhaMessage {
    constructor(bytes, session) {
        super(bytes);
        this.session = session;
        this.commandID = 519;
        this.version = 0;
        this.stream = new ByteStream(bytes);
    }

    decode(self) {
        this.stream.readVInt();
        this.stream.readVInt();
        this.stream.readVInt();
        this.stream.readVInt();
        this.stream.readVInt();
        this.stream.readVInt();
        this.stream.readVInt();
        this.stream.readVInt();
        this.stream.readVInt();
        this.offerID = this.stream.readVInt();
    }

    async process() {
        const account = database.getAccount(this.session.token)
        const myShop = new Shop();
        const foundOffer = myShop.findItemByIndex(this.offerID,account);
        if (foundOffer) {
            if (foundOffer.claim !== true){
            const includesArray = foundOffer.includes;

                if (includesArray.find(item => item.id === 6)) {
                    new LogicBoxCommand(this.session,10,account,includesArray[0].multiplier).send()
                }else if (includesArray.find(item => item.id === 10)){
                    new LogicBoxCommand(this.session,11,account,includesArray[0].multiplier).send()
                }else if (includesArray.find(item => item.id === 14)){
                    new LogicBoxCommand(this.session,12,account,includesArray[0].multiplier).send()
                }else{
                    new LogicShopCommand(this.session,account,includesArray).send()
                }
                foundOffer.claim = true
                database.replaceValue(account.lowID, 'Shop', account.Shop);
        }
    }
    }
}

module.exports = LogicPurchaseOfferCommand;
