/**
 * @name Audio
 *
 * @desc Join audio bots in a meeting
 */

const bigbluebot = require('bigbluebot')

let actions = async page => await bigbluebot.audio.dialog.microphone(page)

bigbluebot.run(actions)
