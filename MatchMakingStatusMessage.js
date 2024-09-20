const PiranhaMessage = require('../../../PiranhaMessage')
const ByteStream = require("../../../../ByteStream")
class MatchMakingStatusMessage extends PiranhaMessage {
  constructor (session,MatchMaking) {
    super(session)
    this.id = 20405
    this.session = session
    this.MatchMaking = MatchMaking
    this.version = 0
    this.stream = new ByteStream()
  }

  async encode () {
    this.stream.writeInt(0);
    this.stream.writeInt(1);//founded
    this.stream.writeInt(6);//max player
    this.stream.writeInt(0);
    this.stream.writeInt(0);
    this.stream.writeBoolean(false);
  }
}

module.exports = MatchMakingStatusMessage
