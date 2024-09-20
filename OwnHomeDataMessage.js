const PiranhaMessage = require('../../../PiranhaMessage')
const ByteStream = require("../../../../ByteStream")
const database = require("../../../../database/db")
const Events = require('../../../../Logic/Events');
const Cards = require("../../../../CSVParser/Cards")
const skills = Cards.getAllSkills(4)
const Shop = require('../../../../Logic/Shop');

class OwnHomeDataMessage extends PiranhaMessage {
  constructor (session) {
    super(session)
    this.id = 24101
    this.session = session
    this.version = 0
    this.stream = new ByteStream()
  }

  async encode () {
    const account = database.getAccount(this.session.token)
    this.stream.writeVInt(0)
    this.stream.writeVInt(0)

    this.stream.writeVInt(account.Trophies)//trophies
    this.stream.writeVInt(account.Trophies)//Hieght trophies

    this.stream.writeVInt(0)
    this.stream.writeVInt(account.TrophyRoadTier)

    this.stream.writeVInt(account.Experience) //Experience

    this.stream.writeDataReference(28, account.Thumbnail)
    this.stream.writeDataReference(43, account.Namecolor)

    this.stream.writeVInt(0) // PlayedGamemodesArray
    this.brawlers = [{
      id: 0,
      cardID: 8,
      unlocked: true,
      level: 0,
      points: 0,
      trophies: 0
      }
    ]
    this.stream.writeVInt(0) // SelectedSkins
    // for (const brawler of this.brawlers) {
    //   this.stream.writeDataReference(29, brawler.skin)
    // }

    this.stream.writeVInt(0) // UnlockedSkins
    // for(let skin of this.skins){
    //   this.stream.writeDataReference(29, skin)
    // }

    this.stream.writeVInt(0)
    this.stream.writeVInt(0)
    this.stream.writeVInt(0)

    this.stream.writeBoolean(false)
    this.stream.writeVInt(1)
    this.stream.writeBoolean(true)

    this.stream.writeVInt(account.TokensDoubler) // tokensdoubler
    this.stream.writeVInt(0)

    this.stream.writeByte(8)

    this.stream.writeBoolean(false)
    this.stream.writeBoolean(false)
    this.stream.writeBoolean(false)

    this.stream.writeVInt(0)
    this.stream.writeVInt(0)
    this.offers = []

    const CallSHOP = new Shop();
    
    CallSHOP.encode(this.stream, account)

    this.stream.writeVInt(0) // AdsArray

    this.stream.writeVInt(account.BattleTokens) // BattleTokens
    this.stream.writeVInt(0)

    this.stream.writeVInt(0)

    this.stream.writeVInt(account.Tickets) // Tickets
    this.stream.writeVInt(0)

    this.stream.writeDataReference(16, account.BrawlerID)//brawlerID

    this.stream.writeString("RU")
    this.stream.writeString(account.AuthorCode)//authorCode

    this.stream.writeVInt(3) // IntValueArray
    this.stream.writeInt(3) 
    this.stream.writeInt(this.session.tokengained) //tokensAnim
    this.stream.writeInt(4) 
    this.stream.writeInt(this.session.trophiesnew) //trophiesAnim
    this.stream.writeInt(5) 
    this.stream.writeInt(this.session.bigtoken) //bigTokensAnim
    this.session.tokengained = 0;
    this.session.trophiesnew = 0;
    this.session.bigtoken = 0;
    
    this.stream.writeVInt(2019049)

    this.stream.writeVInt(100)

    this.stream.writeVInt(10)

    this.stream.writeVInt(30)
    this.stream.writeVInt(3)

    this.stream.writeVInt(80)
    this.stream.writeVInt(10)

    this.stream.writeVInt(50)
    this.stream.writeVInt(1000)

    this.stream.writeVInt(500)
    this.stream.writeVInt(50)
    this.stream.writeVInt(999900)

    this.stream.writeVInt(0) // Array

    const EventsInstance = new Events();
    const Eventes = EventsInstance.getAllEvents()
    this.stream.writeVInt(Eventes.length+1)  // array
    for (let i = 0; i < Eventes.length+1; i++){
        this.stream.writeVInt(i)
    }

    this.stream.writeVInt(Eventes.length)
    for (const map of Eventes) {
      this.stream.writeVInt(Eventes.indexOf(map) + 1)
      this.stream.writeVInt(Eventes.indexOf(map) + 1)
      this.stream.writeBoolean(map.Ended)
      this.stream.writeVInt(map.timer) // timer

      this.stream.writeVInt(map.reward) // tokens
      this.stream.writeDataReference(15, map.id)

      if (map.tokensclaimed.includes(account.lowID)) {
        this.stream.writeVInt(2)//New
      } else {
        this.stream.writeVInt(1)//Used
      }
      this.stream.writeString()
      this.stream.writeVInt(0)
      this.stream.writeBoolean(false)
      this.stream.writeVInt(0)
    }

    this.stream.writeVInt(0) // Coming events array

    this.stream.writeVInt(8)
    for (const i of [20, 35, 75, 140, 290, 480, 800, 1250]) {
      this.stream.writeVInt(i)
    }

    this.stream.writeVInt(8)
    for (const i of [1, 2, 3, 4, 5, 10, 15, 20]) {
      this.stream.writeVInt(i)
    }

    this.stream.writeVInt(3)
    for (const i of [10, 30, 80]) {
      this.stream.writeVInt(i)
    }

    this.stream.writeVInt(3)
    for (const i of [6, 20, 60]) {
      this.stream.writeVInt(i)
    }

    this.stream.writeVInt(4)
    for (const i of [20, 50, 140, 280]) {
      this.stream.writeVInt(i)
    }

    this.stream.writeVInt(4)
    for (const i of [150, 400, 1200, 2600]) {
      this.stream.writeVInt(i)
    }

    this.stream.writeVInt(0)
    this.stream.writeVInt(200) // Max tokens
    this.stream.writeVInt(20)

    this.stream.writeVInt(8640)
    this.stream.writeVInt(10)
    this.stream.writeVInt(5)

    this.stream.writeVInt(6)

    this.stream.writeVInt(50)
    this.stream.writeVInt(604800)
    
    this.stream.writeBoolean(true)

    this.stream.writeVInt(0)//array

    this.stream.writeVInt(1)
    this.stream.writeInt(1)
    this.stream.writeInt(4100001) 


    this.stream.writeInt(0)
    this.stream.writeInt(1)

    this.stream.writeVInt(0) // NotificationFactory
    // this.stream.writeVInt(81) // NotificationID
    // this.stream.writeInt(0) // NotificattitonIndex
    // this.stream.writeBoolean(true) // isSeen
    // this.stream.writeInt(0) // Time ago was received
    // this.stream.writeString('Spooky.js started!') // Message
    // this.stream.writeVInt(1) // sentBy (0 - Tech. Support, 1 - System)

    this.stream.writeBoolean(false)

    this.stream.writeVInt(0)
    this.stream.writeVInt(0)

    this.stream.writeVInt(0)
    this.stream.writeVInt(account.lowID)

    this.stream.writeVInt(0)
    this.stream.writeVInt(0)

    this.stream.writeVInt(0)
    this.stream.writeVInt(0)

    this.stream.writeString(account.Name)
    this.stream.writeVInt(account.Name !== "JSV19" ? 1 : 0);


    this.stream.writeString()

    this.stream.writeVInt(8)

    this.stream.writeVInt(account.Brawlers.length + 4)

    for (const brawler of account.Brawlers) {
      this.stream.writeDataReference(23, brawler.cardID)
      this.stream.writeVInt(brawler.unlocked ? 1 : 0)
    }

    this.stream.writeDataReference(5, 1)
    this.stream.writeVInt(account.Box) // Small Box tokens

    this.stream.writeDataReference(5, 8)
    this.stream.writeVInt(account.Gold) // Gold

    this.stream.writeDataReference(5, 9)
    this.stream.writeVInt(account.BigBox) // Big Box tokens

    this.stream.writeDataReference(5, 10)
    this.stream.writeVInt(account.Starpoints) // StarPoints
    this.stream.writeVInt(account.Brawlers.length)
    for (const brawler of account.Brawlers) {
      this.stream.writeDataReference(16, brawler.id)
      this.stream.writeVInt(brawler.trophies)
    }

    this.stream.writeVInt(account.Brawlers.length)
    for (const brawler of account.Brawlers) {
      this.stream.writeDataReference(16, brawler.id)
      this.stream.writeVInt(brawler.trophies)
    }

    this.stream.writeVInt(0) // UnknownArray

    this.stream.writeVInt(account.Brawlers.length)
    for (const brawler of account.Brawlers) {
      this.stream.writeDataReference(16, brawler.id)
      this.stream.writeVInt(brawler.points)
    }

    this.stream.writeVInt(account.Brawlers.length)
    for (const brawler of account.Brawlers) {
      this.stream.writeDataReference(16, brawler.id)
      this.stream.writeVInt(brawler.level)
    }

    this.stream.writeVInt(account.Brawlers.length)
    for(let brawler of account.Brawlers){
      this.stream.writeDataReference(23, brawler.skill)
      this.stream.writeVInt(brawler.skill ? 1 : 0)
    }

    this.stream.writeVInt(0)

    this.stream.writeVInt(account.Gems)
    this.stream.writeVInt(0)
    this.stream.writeVInt(1)
    this.stream.writeVInt(0)
    this.stream.writeVInt(0)
    this.stream.writeVInt(0)
    this.stream.writeVInt(0)
    this.stream.writeVInt(0)
    this.stream.writeVInt(0)
    this.stream.writeVInt(0)
    this.stream.writeVInt(0)
    this.stream.writeVInt(2)
    this.stream.writeVInt(1585502369)
    this.session.lowID = account.lowID
    this.session.Thumbnail = account.Thumbnail
    this.session.Namecolor = account.Namecolor
    this.session.name = account.Name
  }
}

module.exports = OwnHomeDataMessage
