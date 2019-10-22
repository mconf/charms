/**
 * @name Audio-and-Video
 *
 * @desc Join audio and video bots in a meeting
 */

const bigbluebot = require('bigbluebot')

let actions = async page => {
  await bigbluebot.audio.dialog.microphone(page)
  await bigbluebot.video.join(page)
}

bigbluebot.run(actions)
