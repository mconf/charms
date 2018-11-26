/**
 * @name Audio
 *
 * @desc Collection of bot audio actions
 */

const conf = require('../conf.js')
const util = require('../util.js')

const audio = conf.label.audio

const evaluate = {
  join: async page => await util.visible(page, audio.dialog.modal),
  microphone: async page => await util.visible(page, audio.leave),
  listen: async page => await util.visible(page, audio.leave),
  close: async page => await util.hidden(page, audio.dialog.modal),
  mute: async page => await util.visible(page, audio.unmute),
  unmute: async page => await util.visible(page, audio.mute),
  leave: async page => await util.visible(page, audio.join)
}

module.exports = {
  join: async page => {
    await util.click(page, audio.join)
    await util.test(page, evaluate.join)
  },
  microphone: async page => {
    await util.click(page, audio.dialog.microphone)
    await util.click(page, audio.echo.confirm)
    await util.test(page, evaluate.microphone)
  },
  listen: async page => {
    await util.click(page, audio.dialog.listen)
    await util.test(page, evaluate.listen)
  },
  close: async page => {
    await util.click(page, audio.dialog.close)
    await util.test(page, evaluate.close)
  },
  mute: async page => {
    await util.click(page, audio.mute, true)
    await util.test(page, evaluate.mute)
  },
  unmute: async page => {
    await util.click(page, audio.unmute, true)
    await util.test(page, evaluate.unmute)
  },
  leave: async page => {
    await util.click(page, audio.leave, true)
    await util.test(page, evaluate.leave)
  }
}
