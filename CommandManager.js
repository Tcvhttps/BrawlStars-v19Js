const fs = require('fs')

class CommandManager {
  constructor () {
    this.commands = {}

    fs.readdir('./Protocol/Command', (err, files) => {
      if (err)console.log(err)
      files.forEach(e => {
        const Command = require(`./Command/${e.replace('.js', '')}`)
        const commandClass = new Command()

        this.commands[commandClass.commandID] = Command
      })
    })
  }

  handle (id) {
    return this.commands[id]
  };

  getCommands () {
    return Object.keys(this.commands)
  }
}

module.exports = CommandManager