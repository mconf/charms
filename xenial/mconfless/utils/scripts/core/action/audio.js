/**
 * @name Audio
 *
 * @desc Collection of bot audio actions
 */

const conf = require('../conf.js')
const util = require('../util.js')

const audio = conf.label.audio

module.exports = {
  close: async function(page) {
    await util.click(page, audio.dialog.close)
  },
  join: async function(page) {
    await util.click(page, audio.dialog.microphone)
    await util.click(page, audio.echo.confirm)
  },
  listen: async function(page) {
    await util.click(page, audio.dialog.listenOnly)
  },
  mute: async function(page) {},
  leave: async function(page) {}
}
