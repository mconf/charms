/**
 * @name Audio
 *
 * @desc Collection of bot audio actions
 */

const conf = require('../conf.js')
const util = require('../util.js')

const audio = conf.label.audio

module.exports = {
  join: async page => await util.click(page, audio.join),
  microphone: async page => {
    await util.click(page, audio.dialog.microphone)
    await util.click(page, audio.echo.confirm)
  },
  listen: async page => await util.click(page, audio.dialog.listen),
  close: async page => await util.click(page, audio.dialog.close),
  mute: async page => await util.click(page, audio.mute, true),
  unmute: async page => await util.click(page, audio.unmute, true),
  leave: async page => await util.click(page, audio.leave, true)
}
