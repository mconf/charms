/**
 * @name Video
 *
 * @desc Join video bots in a meeting
 */

const bigbluebot = require('bigbluebot')

let actions = async page => {
  await bigbluebot.video.join(page)
}

bigbluebot.run(actions)
