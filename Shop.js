const fs = require('fs');
const database = require("../database/db")

class Shop {
    constructor() {
        // Load shoparray from offers.json
        this.shoparray = this.loadShopArray();
    }

    loadShopArray() {
        try {
            const data = fs.readFileSync('./Logic/offers.json', 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading offers.json:', error.message);
            return [];
        }
    }

    saveShopArray() {
        try {
            const jsonData = JSON.stringify(this.shoparray, null, 2);
            fs.writeFileSync('./Logic/offers.json', jsonData, 'utf8');
        } catch (error) {
            console.error('Error writing to offers.json:', error.message);
        }
    }

    getAllOffer() {
        return this.shoparray;
    }

    addBuyed(offerID, id) {
        const offer = this.shoparray.find((e) => e.id === offerID);
        if (offer) {
            offer.purchased.push(id);
            this.saveShopArray(); // Save changes to offers.json
            return offer;
        }
        return false;
    }

    getOfferByID(offerID) {
        return this.shoparray.find((e) => e.id === offerID) || null;
    }
    findItemByIndex(index,account) {
        if (index >= 0 && index < account.Shop.length) {
          return account.Shop[index];
        } else {
          return null; // Return null if the index is out of bounds
        }
      }

    update() {
        const allPlayers = database.getAllPlayers();
        for (const player of allPlayers) {
            this.updateShop(player);
        }
    }

    updateNewUser(player) {
        this.updateShop(player);
    }

    updateShop(player) {
        player.Shop = []
        const ArrayShop = [];
        const BrawlerDailyShop = [];
        const unlockedBrawlers = player.Brawlers.filter(brawler => brawler.unlocked === true && brawler.points < 1440 && brawler.level < 8);
        const Random = Math.floor(Math.random() * 2);
    
        const commonProperties = {
            "name": " ",
            "cost": 0,
            "timer": 86400,
            "ShopDisplay": 1,
            "type": 0,
            "claim": false,
            "includes": [{"id": 0, "multiplier": 1, "dataRef": [0, 0], "skinID": 0}]
        };
    
        if (Random === 0) {
            commonProperties.includes[0].id = 1;
            commonProperties.includes[0].multiplier = Math.floor(Math.random() * 333);
            player.Shop.push({ ...commonProperties });
        } else if (Random === 1) {
            commonProperties.includes[0].id = 14;
            commonProperties.cost = 15;
            player.Shop.push({ ...commonProperties });
        } else if (Random === 2) {
            commonProperties.includes[0].id = 10;
            commonProperties.cost = 30;
            player.Shop.push({ ...commonProperties });
        }
    
        for (let i = 0; i < 5; i++) {
            if (unlockedBrawlers.length > 0) {
                let randomIndex = Math.floor(Math.random() * unlockedBrawlers.length);
                const bID = unlockedBrawlers[randomIndex].id;
                unlockedBrawlers.splice(randomIndex, 1);
                BrawlerDailyShop.push(bID);
            }
        }
    

        const ArrayShop2 = [];
        for (let id of BrawlerDailyShop) {
            const commonProperties2 = {
                "name": " ",
                "cost": Math.floor(Math.random() * 333)/2,
                "timer": 86400,
                "ShopDisplay": 1,
                "type": 1,
                "claim": false,
                "includes": [
                    {
                        "id": 8,
                        "multiplier": Math.floor(Math.random() * 333),
                        "dataRef": [16, id],
                        "skinID": 0
                    }
                ]
            }
            player.Shop.push({ ...commonProperties2 });
        }
        database.replaceValue(player.lowID, 'Shop', player.Shop);
    }
    
    
    
    encode(stream, account) {
        this.stream = stream
        this.offers = account.Shop
        this.stream.writeVInt(this.offers.length) 
    
        for(let offer of this.offers){
          this.stream.writeVInt(offer.includes.length)
          for(let item of offer.includes){
            this.stream.writeVInt(item.id)
            this.stream.writeVInt(item.multiplier)
            this.stream.writeDataReference(item.dataRef[0], item.dataRef[1])
            this.stream.writeVInt(item.skinID)
          }
          this.stream.writeVInt(offer.type)
    
          this.stream.writeVInt(offer.cost)
          this.stream.writeVInt(offer.timer)//Timer ?? 
    
          this.stream.writeVInt(0)//Offer View | 0 = Absolutely "NEW", 1 = "NEW", 2 = Viewed
          this.stream.writeVInt(100)
          this.stream.writeBoolean(offer.claim)// purchased
    
          this.stream.writeBoolean(false)
          this.stream.writeVInt(offer.ShopDisplay)// [0 = Normal, 1 = Daily Deals]
          this.stream.writeVInt(0)//OldCost
    
          this.stream.writeInt(0)
          this.stream.writeString(offer.name)
    
          this.stream.writeBoolean(false)
    
        }
    }
}

module.exports = Shop;
