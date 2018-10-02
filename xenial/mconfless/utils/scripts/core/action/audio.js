/**
 * @name Audio
 *
 * @desc Collection of bot audio actions
 */

const conf = require('../conf.js')
const util = require('../util.js')

const audio = conf.label.audio

module.exports = {
  close: async page => await util.click(page, audio.dialog.close),
  join: async page => {
    await util.click(page, audio.dialog.microphone)
    await util.click(page, audio.echo.confirm)
  },
  listen: async page => await util.click(page, audio.dialog.listenOnly),
  mute: async page => {},
  leave: async page => {}
}
