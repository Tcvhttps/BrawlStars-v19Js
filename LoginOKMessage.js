
const PiranhaMessage = require('../../../PiranhaMessage')
const ByteStream = require("../../../../ByteStream")
const config = require("../../../../config.json")

class LoginOKMessage extends PiranhaMessage {
  constructor (session) {
    super(session)
    this.id = 20104
    this.session = session
    this.version = 1
    this.stream = new ByteStream()
  }

  async encode () {

    this.stream.writeLong(0, this.session.lowID)
    this.stream.writeLong(0, this.session.lowID)
    this.stream.writeString(this.session.token)

    this.stream.writeString()
    this.stream.writeString()

    this.stream.writeInt(26)
    this.stream.writeInt(165)
    this.stream.writeInt(1)

    this.stream.writeString("dev")

    this.stream.writeInt(0) 
    this.stream.writeInt(0) 
    this.stream.writeInt(0)

    this.stream.writeString()  
    this.stream.writeString() 
    this.stream.writeString()

    this.stream.writeInt(0)

    this.stream.writeString()

    this.stream.writeString("RU")
    this.stream.writeString()

    this.stream.writeInt(1)

    this.stream.writeString()  
    this.stream.writeString() 
    this.stream.writeString()

    this.stream.writeVInt(0)

    this.stream.writeString()

    this.stream.writeVInt(1)
  }
}

module.exports = LoginOKMessage
