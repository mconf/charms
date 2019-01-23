/**
 * @name Note
 *
 * @desc Join note bots in a meeting
 */

const bigbluebot = require('bigbluebot')

let actions = async page => {
  await bigbluebot.note.open(page)
  await bigbluebot.note.write(page)
}

bigbluebot.run(actions)
