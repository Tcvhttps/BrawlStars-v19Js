const PiranhaMessage = require('../PiranhaMessage');
const ByteStream = require("../../ByteStream");
const database = require('../../database/db');

class LogicShopCommand extends PiranhaMessage {
    constructor(session, account, items) {
        super(session);
        this.id = 24111;
        this.session = session;
        this.version = 1;
        this.stream = new ByteStream();
        this.account = account
        this.items = items
    }

    async encode() {
        this.stream.writeVInt(203);
        this.stream.writeVInt(0);
        this.stream.writeVInt(1);
        this.stream.writeVInt(100);
        this.stream.writeVInt(this.items.length);
        for (const item of this.items) {
            this.stream.writeVInt(item.multiplier);
            if (item.dataRef[0] !== 0) {
                this.stream.writeDataReference(16, item.dataRef[1]);
            }else {
                this.stream.writeVInt(0);
            }
            if (item.id === 1){
                this.stream.writeVInt(7);//coins
                database.replaceValue(this.account.lowID, 'Gold', this.account.Gold+item.multiplier)
            }else if (item.id === 16){
                this.stream.writeVInt(8);//gems
                database.replaceValue(this.account.lowID, 'Gems', this.account.Gems+item.multiplier)
            }else if (item.id === 4){
                this.stream.writeVInt(9);//skins
                this.account.Skins.push(item.skinID)
                database.replaceValue(this.account.lowID, 'Skins', this.account.Skins)
            }else if (item.id === 8){
                this.stream.writeVInt(6);//skins
                const targetBrawler = this.account.Brawlers.find(brawler => brawler.id === item.dataRef[1]);
                targetBrawler.points = targetBrawler.points + item.multiplier
                database.replaceValue(this.account.lowID, 'Brawlers', this.account.Brawlers)
            }
            this.stream.writeDataReference(29, item.skinID || 0);
            if (item.id === 8){
                this.stream.writeDataReference(23, item.brawler);
            }else{
                this.stream.writeVInt(0);
            }

            this.stream.writeVInt(0);
        }
    }
}

module.exports = LogicShopCommand;
