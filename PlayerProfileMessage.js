const PiranhaMessage = require('../../../PiranhaMessage')
const ByteStream = require("../../../../ByteStream")
const PlayerDisplayData = require('../../Wrappers/PlayerDisplayData');

class PlayerProfileMessage extends PiranhaMessage {
  constructor(session, account) {
    super(session);
    this.id = 24113;
    this.session = session;
    this.version = 0;
    this.account = account;
    this.stream = new ByteStream();
  }

  async encode() {
    this.stream.writeLogicLong(0, this.account.lowID)
    this.stream.writeVInt(0)

    const brawlersArray = this.account.Brawlers;

    // Считаем количество бойцов с unlocked == true
    const unlockedBrawlers = brawlersArray.filter(brawler => brawler.unlocked === true);
    const unlockedCount = unlockedBrawlers.length;

    // Теперь unlockedCount содержит количество разблокированных бойцов
    this.stream.writeVInt(unlockedCount);
        for (const brawler of unlockedBrawlers) {
            this.stream.writeDataReference(16, brawler.id);// ID бойца
            this.stream.writeVInt(0); // Кубки бойца
            this.stream.writeVInt(brawler.trophies); // Кубки бойца
            this.stream.writeVInt(brawler.trophies); // Кубки бойца
            this.stream.writeVInt(brawler.level); // Уровень бойца
            // Добавьте другие данные, если необходимо
        }


    this.stream.writeVInt(15)

    this.stream.writeLogicLong(1, this.account.TrioWINS) // 3vs3 wins
    this.stream.writeLogicLong(2, 220) // exp
    this.stream.writeLogicLong(3, this.account.Trophies) // trophies
    this.stream.writeLogicLong(4, this.account.Trophies) // hightrophies
    this.stream.writeLogicLong(5, unlockedCount) // brawlersAmount

    this.stream.writeLogicLong(7, this.account.Thumbnail)  // Something.
    this.stream.writeLogicLong(8, this.account.SoloWINS) // Solo wins
    this.stream.writeLogicLong(9, 0) // RoboRumble time
    this.stream.writeLogicLong(10, 0) // BigBrawler time
    this.stream.writeLogicLong(11, 0) // Duo wins
    this.stream.writeLogicLong(12, 0) // Passed level BossFight
    this.stream.writeLogicLong(13, 1246)//9999
    this.stream.writeLogicLong(14, 1) // Best place in power play
    this.stream.writeLogicLong(15, 15) // Best place in power play
    this.stream.writeLogicLong(16, 0) // Best place in power play
    
    new PlayerDisplayData(this.stream, this.account.Name, this.account.Thumbnail, this.account.Namecolor).encode();

    if (this.account.ClubID !== 0){
            this.stream.writeBoolean(true) // alliance
            this.stream.writeInt(0)
            this.stream.writeInt(this.club.id)
            this.stream.writeString(this.club.Name)  // club name
            this.stream.writeDataReference(8, this.club.BadgeID); // BadgeID type
            this.stream.writeVInt(this.club.Type)  // club type | 1 = Open, 2 = invite only, 3 = closed
            this.stream.writeVInt(this.club.members.length) // Current members count
            this.stream.writeVInt(this.club.Trophies)
            this.stream.writeVInt(this.club.Trophiesneeded)  // Trophy required
            this.stream.writeVInt(0)  // (Unknown)
            this.stream.writeString("PL")  // region
            this.stream.writeVInt(0)  // (Unknown)
            this.stream.writeVInt(0)  // (Unknown)
            this.stream.writeDataReference(25, this.account.ClubRole || 1);
    }else{
      this.stream.writeVInt(0)
      this.stream.writeVInt(0)
    }
  }
}

module.exports = PlayerProfileMessage;
