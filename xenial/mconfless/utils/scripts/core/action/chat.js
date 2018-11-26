/**
 * @name Chat
 *
 * @desc Collection of bot chat actions
 */

const conf = require('../conf.js')
const util = require('../util.js')

const chat = conf.label.chat
const data = conf.config.data

const evaluate = {
  open: async page => await util.visible(page, chat.panel),
  close: async page => await util.hidden(page, chat.panel),
  send: async page => true,
  clear: async page => true,
  copy: async page => true,
  save: async page => true
}

module.exports = {
  open: async page => {
    await util.click(page, chat.open, true)
    await util.test(page, evaluate.open)
  },
  close: async page => {
    await util.click(page, chat.close)
    await util.test(page, evaluate.close)
  },
  send: async page => {
    let messages = data.chat
    for (let i = 0; i < messages.length; i++) {
      await util.type(page, chat.form.input, messages[i], true)
      await util.click(page, chat.form.send)
    }
    await util.test(page, evaluate.send)
  },
  clear: async page => {
    await util.test(page, evaluate.clear)
  },
  copy: async page => {
    await util.test(page, evaluate.copy)
  },
  save: async page => {
    await util.test(page, evaluate.save)
  }
}
