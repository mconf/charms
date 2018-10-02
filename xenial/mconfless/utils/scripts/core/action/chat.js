/**
 * @name Chat
 *
 * @desc Collection of bot chat actions
 */

const conf = require('../conf.js')
const util = require('../util.js')

const chat = conf.label.chat
const data = conf.config.data

module.exports = {
  open: async page => await util.click(page, chat.open, true),
  close: async page => await util.click(page, chat.close),
  send: async page => {
    let messages = data.chat
    for (let i = 0; i < messages.length; i++) {
      await util.type(page, chat.form.input, messages[i], true)
      await util.click(page, chat.form.send)
    }
  },
  clear: async page => {},
  copy: async page => {},
  save: async page => {}
}
