/**
 * @name Chat
 *
 * @desc Join chat bots in a meeting
 */

const bigbluebot = require('bigbluebot')

let actions = async page => {
  await bigbluebot.chat.open(page)
  await bigbluebot.chat.send(page)
}

bigbluebot.run(actions)
