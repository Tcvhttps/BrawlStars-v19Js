const PiranhaMessage = require('../../../PiranhaMessage')
const ByteStream = require("../../../../ByteStream")

class StartLoadingMessage extends PiranhaMessage {
  constructor(session) {
    super(session);
    this.id = 20559;
    this.session = session;
    this.version = 1;
    this.stream = new ByteStream();

  }

  async encode() {
    this.stream.writeInt(6);
    this.stream.writeInt(0);//OwnIndex
    this.stream.writeInt(0);//TeamIndex
    this.stream.writeInt(6);
    const team = 0
    for (let i = 0; i < 6; i++) {
          this.stream.writeInt(0);
          this.stream.writeInt(this.session.lowID+i);
          this.stream.writeVInt(i);
          if(i === 2){
            team == 1;
          }
          this.stream.writeVInt(team);//team
          this.stream.writeVInt(0);
          this.stream.writeInt(0);
          this.stream.writeDataReference(16, this.session.brawlerID);
          this.stream.writeVInt(0);
          this.stream.writeBoolean(false);
          this.stream.writeString(this.session.name);
          this.stream.writeVInt(100);
          this.stream.writeVInt(28000000 + this.session.Thumbnail);
          this.stream.writeVInt(43000000 + this.session.Namecolor);
    }


    this.stream.writeInt(0);//maybe modificator array

    this.stream.writeInt(0);//idk

    this.stream.writeInt(0);// idk x2

    this.stream.writeVInt(0);
    this.stream.writeVInt(1);//DrawMap
    this.stream.writeVInt(1);

    this.stream.writeByte(1);//2, 39 - Spectating
    this.stream.writeVInt(0);// is Spectating
    this.stream.writeVInt(0);

    this.stream.writeDataReference(15,11);
	//24+ add this.stream.writeVInt(0);
  }
}

module.exports = StartLoadingMessage;
