const PiranhaMessage = require('../PiranhaMessage')
const ByteStream = require("../../ByteStream")
const database = require("../../database/db")

class deliveryItems extends PiranhaMessage {
  constructor(session,box,item=0,amount=0,fipi = -1,account) {
    super(session);
    this.id = 24111;
    this.session = session;
    this.version = 1;
    this.stream = new ByteStream();
    this.box = box
    this.item = item
    this.amount = amount
    this.fipi = fipi
    this.account = account
    this.items = []
    }
  async encode() {
    let coins = 0;
    let gems = 0;

    this.stream.writeVInt(203);
    this.stream.writeVInt(0);

    this.stream.writeVInt(1)
    this.stream.writeVInt(100)
    this.stream.writeVInt(1)
    this.stream.writeVInt(this.amount)
    if (this.fipi==-1){
    this.stream.writeVInt(0)
    }
    else{
    this.stream.writeVInt(16)
    this.stream.writeVInt(this.fipi)
    }
    this.stream.writeVInt(this.item)
    this.stream.writeVInt(0)
    this.stream.writeVInt(0)
    this.stream.writeVInt(0)

    this.stream.writeVInt(this.account.TrophyRoadTier+1)

  }
}

module.exports = deliveryItems;