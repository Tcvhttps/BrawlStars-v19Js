const StartLoadingMessage = require('../Protocol/Messages/Server/Battle/StartLoadingMessage');
const UDPConnectionInfo = require('../Protocol/Messages/Server/Battle/UDPConnectionInfo');
const VisionUpdateMessage = require('../Protocol/Messages/Server/Battle/VisionUpdateMessage');

class BattleCore {
  constructor(session) {
    this.session = session
    this.playerLeft = 0;
  }

  run() {
    this.startBattle();
  }

  startBattle() {
    this.session.battleTick = 0;
    new StartLoadingMessage(this.session).send();
    new UDPConnectionInfo(this.session).send();
    const battleInterval = setInterval(() => {
      if (true) {
        this.session.battleTick += 1;
        this.process();
      } else {
        clearInterval(battleInterval);
      }
    }, 50);
  }

  process() {
    new VisionUpdateMessage(this.session, this.a).send();
  }
}

module.exports = BattleCore;
