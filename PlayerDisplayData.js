class PlayerDisplayData {
    constructor(stream, name, playericon, namecolor) {
      this.stream = stream;
      this.name = name;
      this.playericon = playericon
      this.namecolor = namecolor
    }
  
    encode() {
      this.stream.writeString(this.name);
      this.stream.writeVInt(100);
      this.stream.writeVInt(28000000 + this.playericon);
      this.stream.writeVInt(43000000 + this.namecolor);
    }
  }
  
  module.exports = PlayerDisplayData;
  