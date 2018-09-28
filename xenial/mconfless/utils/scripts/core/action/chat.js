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
  open: async function(page) {
    await util.click(page, chat.open, true)
  },
  send: async function(page) {
    let messages = data.chat
    for (let i = 0; i < messages.length; i++) {
      await util.type(page, chat.form.input, messages[i], true)
      await util.click(page, chat.form.send)
    }
  },
  clear: async function(page) {},
  copy: async function(page) {},
  save: async function(page) {}
}
