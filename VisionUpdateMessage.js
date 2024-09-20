const PiranhaMessage = require('../../../PiranhaMessage')
const ByteStream = require("../../../../ByteStream")

const BitStream = require("../../../../Battle/BitStream/BitStream")

class VisionUpdateMessage extends PiranhaMessage {
  constructor(session, a) {
    super(session);
    this.id = 24109;
    this.session = session;
    this.a = a;
    this.version = 1;
    this.playerLeft = 0;
    this.stream = new ByteStream();

  }

  encode() {
    this.stream.writeVInt(this.session.battleTick);//battleTick
    this.stream.writeVInt(this.session.counter);//dudu
    this.stream.writeVInt(0);//command count
    this.stream.writeVInt(this.session.battleTick); //views?*?
    this.stream.writeBoolean(false);//in live
    
    const bitStream = new BitStream();
    bitStream.writePositiveInt(1000000 + 0, 21);
    bitStream.writePositiveVInt(0, 4);
    bitStream.writeBoolean(false);
    bitStream.writeInt(-1, 4);

    bitStream.writeBoolean(true);
    bitStream.writeBoolean(true);
    bitStream.writeBoolean(true);
    bitStream.writeBoolean(false);

    bitStream.WritePositiveIntMax31(0);
    bitStream.WritePositiveIntMax63(0);
    bitStream.WritePositiveIntMax31(0);
    bitStream.WritePositiveIntMax63(0);

    for (let i = 0; i < 6; i++) {
      bitStream.writeBoolean(false);
      bitStream.writeBoolean(false);
      if (i === 1) {
        bitStream.writePositiveInt(0, 12);
        bitStream.writeBoolean(false);

      }
    }

    for (let i = 0; i < 6; i++) {
      bitStream.writeBoolean(true);
      bitStream.writePositiveVIntMax255(1);
      bitStream.writeBoolean(false);

    }
    bitStream.writePositiveInt(1, 7);

    bitStream.writePositiveInt(16, 5);
    bitStream.writePositiveInt(0, 7);

    bitStream.writePositiveInt(0, 14);

    bitStream.writePositiveVInt(3250, 4);
    bitStream.writePositiveVInt(4950, 4);
    bitStream.writePositiveVInt(0, 3);
    bitStream.writePositiveVInt(0, 4);
    bitStream.writePositiveInt(10, 4);

    bitStream.writeBoolean(false); // isownobj

    bitStream.writePositiveInt(0, 3);
    bitStream.writeBoolean(false);
    bitStream.writeInt(63, 6);
    bitStream.writeBoolean(false);// дёргает и не rotate
    bitStream.writeBoolean(false);// дёргает и не rotate
    bitStream.writeBoolean(false);// star power indicator
    bitStream.writePositiveVIntMax255OftenZero(0);
    bitStream.writePositiveVIntMax255OftenZero(0);
    bitStream.writeBoolean(false);
    bitStream.writeBoolean(false);
    bitStream.writePositiveInt(0, 2);
    bitStream.writePositiveInt(3600, 13); // hp
    bitStream.writePositiveInt(3600, 13); // max hp
    bitStream.writePositiveVIntMax255OftenZero(0);
    bitStream.writePositiveVIntMax255OftenZero(0);
    bitStream.writeBoolean(false); // big brawler
    bitStream.writeBoolean(false); // range
    bitStream.writeBoolean(false); // unk

    bitStream.writePositiveInt(0, 4); // is own

    bitStream.writePositiveInt(0, 2);
    bitStream.writeBoolean(false);
    bitStream.writePositiveInt(0, 9);

    bitStream.writeBoolean(false); // is own

    bitStream.writePositiveInt(0, 5);

    bitStream.writePositiveVIntMax255OftenZero(0);
    bitStream.writeBoolean(false);
    bitStream.writePositiveVIntMax255OftenZero(0);
    bitStream.writePositiveInt(3000, 12);
    bitStream.writePositiveVIntMax255OftenZero(0);
    bitStream.writeBoolean(false);
    bitStream.writePositiveVIntMax255OftenZero(0);

    bitStream.writePositiveInt(0,8)
    this.stream.writeBytes(bitStream.getBuff());
  }
}

module.exports = VisionUpdateMessage;
