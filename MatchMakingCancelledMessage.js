const PiranhaMessage = require('../../../PiranhaMessage')
const ByteStream = require("../../../../ByteStream")

class MatchMakingCancelledMessage extends PiranhaMessage {
  constructor (session) {
    super(session)
    this.id = 20406
    this.session = session
    this.version = 0
    this.stream = new ByteStream()
  }

  async encode () {
    //
  }
}

module.exports = MatchMakingCancelledMessage
