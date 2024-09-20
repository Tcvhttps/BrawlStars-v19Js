const PiranhaMessage = require('../../../PiranhaMessage')
const ByteStream = require("../../../../ByteStream")

class UDPConnectionInfo extends PiranhaMessage {
  constructor (session) {
    super(session)
    this.id = 24112
    this.session = session
    this.version = 0
    this.stream = new ByteStream()
  }

  async encode () {
    this.stream.writeVInt(1488);
    this.stream.writeString();
    this.stream.writeInt(0);
    this.stream.writeByte(0);
    this.stream.writeInt(1);
    this.stream.writeByte(0);

  }
}

module.exports = UDPConnectionInfo
