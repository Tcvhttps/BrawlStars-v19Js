const PiranhaMessage = require('../PiranhaMessage')
const ByteStream = require("../../ByteStream")
const database = require("../../database/db")
const deliveryItems = require('./deliveryItems')
const LogicBoxCommand = require('./LogicBoxCommand')

class LkPrtctrdMilestone extends PiranhaMessage{
    constructor(bytes, session){
        super(bytes)
        this.session = session;
        this.commandID = 517
        this.version = 0        
        this.stream = new ByteStream(bytes);
    }

    decode(self){

        for (let i of Array(9).keys()){this.stream.readVInt()}   
        this.stream.readVInt()
        this.Brawler = this.stream.readVInt()
    }

    async process(){
        function GetQuantityFromLevel(AllLevels,AllQuantities,ThisLevel){
            return AllQuantities[AllLevels.indexOf(ThisLevel)]
        }
        const account = database.getAccount(this.session.token)
        database.replaceValue(account.lowID, 'TrophyRoadTier', account.TrophyRoadTier + 1)
        account.TrophyRoadTier = account.TrophyRoadTier
        this.Level = account.TrophyRoadTier-1
            if ([15,18,22,25,28,31,35,38,40,43,45,47,49,53,56,62,65,68,70,73,77,80,82,85,86,87,89,90,91,93].includes(this.Level)){ // Coins
                var Amount = GetQuantityFromLevel(
                    [15,18,22,25,28,31,35,38,40,43,45,47,49,53,56,62,65,68,70,73,77,80,82,85,86,87,89,90,91,93],
                    [50, 50, 50, 50, 50, 50, 50, 50, 150, 50, 50, 300, 50, 50, 50, 150, 50, 50, 50, 50, 150, 50, 150, 150, 300, 150, 150, 300, 150, 150],
                    this.Level)
                database.replaceValue(account.lowID, 'Gold', account.Gold + Amount)
                new deliveryItems(this.session,100,7,Amount,-1,account).send()
            }
            if ([0,2,4,10,13,19,26,32,36,39,41,48,51,61,66,76,78,83].includes(this.Level)){ // Box
                new LogicBoxCommand(this.session,10,account,1, true).send()
            }
            if ([17,30,57,72].includes(this.Level)){ // BigBox
                new LogicBoxCommand(this.session,12,account,1, true).send()
            }
            if ([59,64,69,74,79,84,88,92].includes(this.Level)){ // MegaBox
                new LogicBoxCommand(this.session,11,account,1, true).send()
            }
            if ([6,50].includes(this.Level)){ // TokenDoubler
                var Amount = GetQuantityFromLevel(
                    [6,50],
                    [200,600],
                    this.Level)
                database.replaceValue(account.lowID, 'TokensDoubler', account.TokensDoubler + Amount)
                new deliveryItems(this.session,100,2,Amount,-1,account).send()
            }
            if ([8,12,16,21,27,29,33,37,42,46,52,55,58,60,63,67,71,75,81].includes(this.Level)){ // PowerPoints
                var Amount = GetQuantityFromLevel(
                    [8,12,16,21,27,29,33,37,42,46,52,55,58,60,63,67,71,75,81],
                    [25, 25, 25, 25, 75, 25, 25, 150, 25, 25, 25, 25, 25, 25, 25, 75, 25, 25, 25],
                    this.Level)
                var brawlerFipi = this.Brawler
                const targetBrawler = account.Brawlers.find(brawler => brawler.id === this.Brawler);
                targetBrawler.points = targetBrawler.points + Amount;
                database.replaceValue(account.lowID, 'Brawlers', account.Brawlers);
                new deliveryItems(this.session,100,6,Amount,brawlerFipi,account).send()
            }
            if ([23].includes(this.Level)){ // Tickets
                var Amount = GetQuantityFromLevel(
                    [23],
                    [10],
                    this.Level)
                database.replaceValue(account.lowID, 'Tickets', account.Tickets + Amount)
                new deliveryItems(this.session,100,3,Amount,-1,account).send()
            }
            if ([1,5,9,14,24,34,44,54,74].includes(this.Level)){ // Brawler
                var Character = GetQuantityFromLevel(
                    [1,5,9,14,24,34,44,54],
                    [8, 1, 2, 7, 3, 9, 14, 22],
                    this.Level)
                const targetBrawler = account.Brawlers.find(brawler => brawler.id === Character);
                if (!targetBrawler.unlocked){
                    targetBrawler.unlocked = true;
                    database.replaceValue(account.lowID, 'Brawlers', account.Brawlers)
                    new deliveryItems(this.session,100,1,1,Character,account).send()
                }
                else{
                    new LogicBoxCommand(this.session,10,account,1, true).send()
                }
                
            }
            var toDoNothing = [3,7,11,20]
            if (toDoNothing.includes(this.Level)){}
            
        }
    }

module.exports = LkPrtctrdMilestone