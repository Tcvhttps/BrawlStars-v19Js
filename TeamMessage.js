const PiranhaMessage = require('../../../PiranhaMessage')
const ByteStream = require("../../../../ByteStream")

class TeamMessage extends PiranhaMessage {
  constructor(session, roomInfo) {
    super(session);
    this.id = 24124;
    this.session = session;
    this.roomInfo = roomInfo;
    this.version = 0;
    this.stream = new ByteStream();
  }

  async encode() {
    this.stream.writeVInt(this.roomInfo.roomType);//RoomType
    this.stream.writeBoolean(false)//?
    this.stream.writeVInt(3);

    this.stream.writeLong(0, this.roomInfo.id);

    this.stream.writeVInt(100);
    this.stream.writeBoolean(false)//?
    this.stream.writeVInt(0);

    this.stream.writeVInt(this.roomInfo.mapSlot);//Slot index
    this.stream.writeDataReference(15, this.roomInfo.mapID)//mapid
    this.stream.writeVInt(1);//player lenght

    if (true){
      this.stream.writeBoolean(true)//owner room
      this.stream.writeInt(0);
      this.stream.writeInt(this.session.lowID);
      this.stream.writeDataReference(16, 0)//mapid
      this.stream.writeDataReference(29, 52)//mapid
      this.stream.writeVInt(0);//brawler trop
      this.stream.writeVInt(0);//brawler trop
      this.stream.writeVInt(1);//brawler levl
      this.stream.writeVInt(3);//Player State | 11: Events, 10: Brawlers, 9: Writing..., 8: Training, 7: Spectactor, 6: Offline, 5: End Combat Screen, 4: Searching, 3: Not Ready, 2: AFK, 1: In Combat, 0: OffLine
      this.stream.writeBoolean(false)//IsReady
      this.stream.writeVInt(0);//Team 0 blue 1 read
      this.stream.writeVInt(0);
      this.stream.writeVInt(2);

      this.stream.writeDataReference(0, 0) 
    }


    this.stream.writeVInt(0);//InvitationArray
    this.stream.writeVInt(0);//Array
    this.stream.writeBoolean(false)

  }
}

module.exports = TeamMessage;
