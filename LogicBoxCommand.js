const PiranhaMessage = require('../PiranhaMessage');
const ByteStream = require("../../ByteStream");
const database = require("../../database/db")
const Cards = require('../../CSVParser/Cards'); // Import the Cards class from cards.js

class LogicBoxCommand extends PiranhaMessage {
    constructor(session, box, account, count = 1, isClaim=false) {
        super(session);
        this.id = 24111;
        this.session = session;
        this.version = 1;
        this.stream = new ByteStream();
        this.account = account
        this.box = box
        this.items = []
        this.count = count
        this.isClaim = isClaim
    }



    generateItems() {
        const newItem = [];
        let Gold;
        let brawlerPoints;
        let gems = 0;
        let brawler = -1;
        let randomBrawlerID;
        let newBrawler;

        const unlockedBrawlers = this.account.Brawlers.filter(brawler => brawler.unlocked === true && brawler.points < 1440 && brawler.level < 8);
        const blockedBrawlers = this.account.Brawlers.filter(brawler => brawler.unlocked === false);
        const newbrawler = Math.floor(Math.random() * 100);

        if (blockedBrawlers.length !== 0){
            if (newbrawler >= 88) {
                let randomIndex = Math.floor(Math.random() * blockedBrawlers.length);
                const brawleraID = blockedBrawlers[randomIndex].id;
                let blockB = [8, 0, 1, 2, 7, 3, 9, 14, 22, 27, 30];

                const targetBrawler = this.account.Brawlers.find(brawler => brawler.id === brawleraID);
                if (targetBrawler.unlocked === false && !blockB.includes(brawleraID)) {
                    newItem.push({ type: 1, ammount: 1, brawler: brawleraID })
                    targetBrawler.unlocked = true;
                    database.replaceValue(this.account.lowID, 'Brawlers', this.account.Brawlers);
                    newBrawler = true;
                }
            }
        }

        switch (this.box) {
            case 10: // default
                if (!newBrawler){
                    Gold = Math.floor(Math.random() * (55) + 21);
                    newItem.push({ type: 7, ammount: Gold, brawler: -1 })
                    database.replaceValue(this.account.lowID, 'Gold', this.account.Gold+Gold)
                    for (let i = 0; i < 2; i++) {
                        if (unlockedBrawlers.length > 0) {
                            brawlerPoints = Math.floor(Math.random() * (55) + 32);
                            const randomIndex = Math.floor(Math.random() * unlockedBrawlers.length);
                            randomBrawlerID = unlockedBrawlers[randomIndex].id;
                            unlockedBrawlers.splice(randomIndex, 1);
                            newItem.push({ type: 6, ammount: brawlerPoints, brawler: randomBrawlerID })
                            const targetBrawler = this.account.Brawlers.find(brawler => brawler.id === randomBrawlerID);
                            targetBrawler.points = targetBrawler.points + brawlerPoints
                            database.replaceValue(this.account.lowID, 'Brawlers', this.account.Brawlers)
                        }
                    }
                    const dropGems = Math.floor(Math.random() * 100)
                    if (dropGems >= 90) {
                        newItem.push({ type: 8, ammount: Gold / 15, brawler: -1 })
                        database.replaceValue(this.account.lowID, 'Gems', this.account.Gems+Gold/15)
                    }
                    
                }
                const BrawlerOf9LVL = this.account.Brawlers.filter(brawler => brawler.level >= 8 && brawler.skill == 0);
                if (BrawlerOf9LVL.length > 0){
                    const changeOfGive = Math.floor(Math.random() * 100);
                    if(changeOfGive > 80){
                        let randomIndex = Math.floor(Math.random() * BrawlerOf9LVL.length);
                        const brawleraID = BrawlerOf9LVL[randomIndex].id;
                        const spg = Cards.getBrawlerSkills(4, brawleraID)[0]
                        const targetBrawler = this.account.Brawlers.find(brawler => brawler.id === brawleraID);
                        targetBrawler.skill = spg
                        database.replaceValue(this.account.lowID, 'Brawlers', this.account.Brawlers)
                        newItem.push({ type: 4, ammount: 1, brawler: spg })
                    }
                }
                this.items.push(...newItem);
                break;
            case 11: // mega
                Gold = Math.floor(Math.random() * (480 - 120) + 120);
                newItem.push({ type: 7, ammount: Gold, brawler: -1 })
                database.replaceValue(this.account.lowID, 'Gold', this.account.Gold+Gold)

                for (let i = 0; i < 6; i++) {
                    if (unlockedBrawlers.length > 0) {
                        brawlerPoints = Math.floor(Math.random() * (55) + 144);
                        const randomIndex = Math.floor(Math.random() * unlockedBrawlers.length);
                        randomBrawlerID = unlockedBrawlers[randomIndex].id;
                        unlockedBrawlers.splice(randomIndex, 1);
                        newItem.push({ type: 6, ammount: brawlerPoints, brawler: randomBrawlerID })
                        const targetBrawler = this.account.Brawlers.find(brawler => brawler.id === randomBrawlerID);
                        targetBrawler.points = targetBrawler.points + brawlerPoints
                        database.replaceValue(this.account.lowID, 'Brawlers', this.account.Brawlers)
                    }
                }

                const dropGems2 = Math.floor(Math.random() * 100)
                if (dropGems2 >= 60) {
                    newItem.push({ type: 8, ammount: Gold / 14, brawler: -1 })
                    database.replaceValue(this.account.lowID, 'Gems', this.account.Gems+Gold/14)
                }
                const BrawlerOf9LVL2 = this.account.Brawlers.filter(brawler => brawler.level >= 8 && brawler.skill == 0);
                if (BrawlerOf9LVL2.length > 0){
                    const changeOfGive2 = Math.floor(Math.random() * 100);
                    if(changeOfGive2 > 67){
                        let randomIndex = Math.floor(Math.random() * BrawlerOf9LVL2.length);
                        const brawleraID = BrawlerOf9LVL2[randomIndex].id;
                        const spg = Cards.getBrawlerSkills(4, brawleraID)[0]
                        const targetBrawler = this.account.Brawlers.find(brawler => brawler.id === brawleraID);
                        targetBrawler.skill = spg
                        database.replaceValue(this.account.lowID, 'Brawlers', this.account.Brawlers)
                        newItem.push({ type: 4, ammount: 1, brawler: spg })
                    }
                }
                this.items.push(...newItem);
                break;
            case 12: // big
                Gold = Math.floor(Math.random() * (68) + 27);
                newItem.push({ type: 7, ammount: Gold, brawler: -1 })
                database.replaceValue(this.account.lowID, 'Gold', this.account.Gold+Gold)

                for (let i = 0; i < 4; i++) {
                    if (unlockedBrawlers.length > 0) {
                        brawlerPoints = Math.floor(Math.random() * (55) + 64);
                        const randomIndex = Math.floor(Math.random() * unlockedBrawlers.length);
                        randomBrawlerID = unlockedBrawlers[randomIndex].id;
                        unlockedBrawlers.splice(randomIndex, 1);
                        newItem.push({ type: 6, ammount: brawlerPoints, brawler: randomBrawlerID })
                        const targetBrawler = this.account.Brawlers.find(brawler => brawler.id === randomBrawlerID);
                        targetBrawler.points = targetBrawler.points + brawlerPoints
                        database.replaceValue(this.account.lowID, 'Brawlers', this.account.Brawlers)
                    }
                }
                const dropGems3 = Math.floor(Math.random() * 100)
                if (dropGems3 >= 80) {
                    newItem.push({ type: 8, ammount: Gold / 15, brawler: -1 })
                    database.replaceValue(this.account.lowID, 'Gems', this.account.Gems+Gold/15)
                }
                const BrawlerOf9LVL3 = this.account.Brawlers.filter(brawler => brawler.level >= 8 && brawler.skill == 0);
                if (BrawlerOf9LVL3.length > 0){
                    const changeOfGive3 = Math.floor(Math.random() * 100);
                    if(changeOfGive3 > 72){
                        let randomIndex = Math.floor(Math.random() * BrawlerOf9LVL3.length);
                        const brawleraID = BrawlerOf9LVL3[randomIndex].id;
                        const spg = Cards.getBrawlerSkills(4, brawleraID)[0]
                        const targetBrawler = this.account.Brawlers.find(brawler => brawler.id === brawleraID);
                        targetBrawler.skill = spg
                        database.replaceValue(this.account.lowID, 'Brawlers', this.account.Brawlers)
                        newItem.push({ type: 4, ammount: 1, brawler: spg })
                    }
                }
                this.items.push(...newItem);
                break;
        }
        return newItem;

    }

    async encode() {
        this.stream.writeVInt(203);// CommandID
        this.stream.writeVInt(1); 
        this.stream.writeVInt(this.count);//Unknown
        for (let i = 0; i < this.count; i++) {
            this.stream.writeVInt(this.box);
            const items = this.generateItems();
            this.stream.writeVInt(items.length);
            for (const item of items) {
                console.log(item)
                this.stream.writeVInt(item.ammount);

                if (item.brawler !== -1) {
                    this.stream.writeDataReference(16, item.brawler);
                } else {
                    this.stream.writeVInt(0);
                }
                this.stream.writeVInt(item.type);
                this.stream.writeVInt(0);
                if (item.type === 4){
                    this.stream.writeDataReference(23, item.brawler);
                }else{
                    this.stream.writeVInt(0);
                }
                this.stream.writeVInt(0);
            }
        }

        if (this.isClaim){
            this.stream.writeVInt(this.account.TrophyRoadTier+1);
        }else{
            for (let i = 0; i < 13; i++) {
                this.stream.writeVInt(0);
            }
    
        }
    }
}

module.exports = LogicBoxCommand;
