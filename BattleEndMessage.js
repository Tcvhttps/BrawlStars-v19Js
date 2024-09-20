const PiranhaMessage = require('../../../PiranhaMessage') // You should change it if you transfer this file in another subdirectory
const ByteStream = require("../../../../ByteStream")
const PlayerDisplayData = require('../../Wrappers/PlayerDisplayData');
const fs = require('fs');
const database = require("../../../../database/db")
class BattleEndMessage extends PiranhaMessage {
  constructor(session, battle_result, playerArray, rank, playersAmount) {
    super(session);
    this.id = 23456;
    this.session = session;
    this.version = 1;
    this.battle_result = battle_result;
    this.playerArray = playerArray
    this.rank = rank
    this.playersAmount = playersAmount
    this.stream = new ByteStream();

  }
  async encode() {
    const account = database.getAccount(this.session.token)
    const Brawler = account.Brawlers.find(brawler => brawler.id === account.BrawlerID);
    if (this.playersAmount == 6){
      if (this.battle_result === 0){
        this.session.bigtoken += 1
        this.session.tokengained += Math.floor(Math.random() * 50)
        this.session.trophiesnew += 14
      }else if (this.battle_result === 0){
        if (Brawler.trophies-7 >= 0){
          this.session.tokengained += Math.floor(Math.random() * 25)
          this.session.trophiesnew -= 7
        }
      }else{
        this.session.trophiesnew = 0 
        this.session.tokengained += Math.floor(Math.random() * 10)
      }
    }else if (this.playersAmount == 10){
      this.session.tokengained += Math.floor(Math.random() * 50)
      if (this.rank == 0){
        this.session.bigtoken += 1
        this.session.trophiesnew += 24
      }else if (this.rank == 1){
        this.session.bigtoken += 1
        this.session.trophiesnew += 16
      }else if (this.rank == 2){
        this.session.bigtoken += 1
        this.session.trophiesnew += 12
      }else if (this.rank == 3){
        this.session.bigtoken += 1
        this.session.trophiesnew += 8
      }else if (this.rank == 4){
        this.session.trophiesnew += 6
      }else if (this.rank == 5){
        this.session.trophiesnew += 4
      }else if (this.rank == 6){
        this.session.trophiesnew -= 0
      }
      if (Brawler.trophies-8 >= 4){
        if (this.rank == 7){
          this.session.trophiesnew -= 4
        }else if (this.rank == 8){
          this.session.trophiesnew -= 6
        }else if (this.rank == 9){
          this.session.trophiesnew -= 8
        }
      }
    }

    this.stream.writeVInt((this.rank !== 0) ? 2 : (1));

    this.stream.writeVInt(this.battle_result)//Result (Victory/Defeat/Draw/Rank Score)
    this.stream.writeVInt(this.session.tokengained);//Tokens Gained
    this.stream.writeVInt(this.session.trophiesnew);//Trophies Result

    this.stream.writeVInt(0);//Doubled Tokens
    this.stream.writeVInt(0);//Token Doubler Remaining
    this.stream.writeVInt(0);// Big Game/Robo Rumble Time and Boss Fight Level Cleared


    this.stream.writeVInt(16);//Championship Level Passed
    
    this.stream.writeVInt(1+this.playerArray.length);//Battle End Screen Players
    this.stream.writeVInt(1);// Player Team and Star Player Type
    this.stream.writeDataReference(16,account.BrawlerID);
    this.stream.writeDataReference(29,account.SkinID);
    this.stream.writeVInt(Brawler.trophies)
    this.stream.writeVInt(Brawler.level+1); // хз ебать
    this.stream.writeBoolean(true);// Player HighID and LowID Array
    this.stream.writeInt(0);// HighID
    this.stream.writeInt(account.lowID);// LowID
    new PlayerDisplayData(this.stream, account.Name, account.Thumbnail, account.Namecolor).encode();
    for (let i = 0; i < this.playerArray.length; i++) {
      if (i < 2){
        this.stream.writeVInt(0);// Player Team and Star Player Type
      }else{
        this.stream.writeVInt(2);// Player Team and Star Player Type
      }
      this.stream.writeDataReference(16,this.playerArray[i]['brawlerID']);
      this.stream.writeDataReference(29,0);
      this.stream.writeVInt(0);// Brawler Trophies
      this.stream.writeVInt(0); // brawler lvl
      this.stream.writeBoolean(false);// Player HighID and LowID Array
      new PlayerDisplayData(this.stream, this.playerArray[i]['name'], 0, 0).encode();
    }

    this.stream.writeVInt(0);
    this.stream.writeVInt(0);

    this.stream.writeVInt(2);
    this.stream.writeVInt(1)
    this.stream.writeVInt(Brawler.trophies)
    this.stream.writeVInt(Brawler.trophies)
    this.stream.writeVInt(5)
    this.stream.writeVInt(90)
    this.stream.writeVInt(90)

    this.stream.writeDataReference(28,0);
    this.stream.writeBoolean(false);

    Brawler.trophies = Brawler.trophies + this.session.trophiesnew
    database.replaceValue(account.lowID, 'Brawlers', account.Brawlers)

    account.Box = account.Box + this.session.tokengained
    database.replaceValue(account.lowID, 'Box', account.Box)

    account.BigBox = account.BigBox + this.session.bigtoken
    database.replaceValue(account.lowID, 'BigBox', account.BigBox)
  }
}

module.exports = BattleEndMessage;
