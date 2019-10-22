/**
 * @name Listen-Only
 *
 * @desc Join listen-only bots in a meeting
 */

const bigbluebot = require('bigbluebot')

let actions = async page => await bigbluebot.audio.dialog.listen(page)

bigbluebot.run(actions)
