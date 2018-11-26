/**
 * @name User
 *
 * @desc Collection of bot user actions
 */

const conf = require('../conf.js')
const util = require('../util.js')

const user = conf.label.user

const evaluate = {
  open: async page => await util.visible(page, user.panel),
  close: async page => await util.hidden(page, user.panel),
  away: async page => true,
  hand: async page => true,
  undecided: async page => true,
  confused: async page => true,
  sad: async page => true,
  happy: async page => true,
  applaud: async page => true,
  up: async page => true,
  down: async page => true,
  clear: async page => true,
  promote: async page => true,
  demote: async page => true,
  kick: async page => true
}

module.exports = {
  open: async page => {
    await util.click(page, user.open)
    await util.test(page, evaluate.open)
  },
  close: async page => {
    await util.click(page, user.close)
    await util.test(page, evaluate.close)
  },
  away: async page => {
    await util.test(page, evaluate.away)
  },
  hand: async page => {
    await util.test(page, evaluate.hand)
  },
  undecided: async page => {
    await util.test(page, evaluate.undecided)
  },
  confused: async page => {
    await util.test(page, evaluate.confused)
  },
  sad: async page => {
    await util.test(page, evaluate.sad)
  },
  happy: async page => {
    await util.test(page, evaluate.happy)
  },
  applaud: async page => {
    await util.test(page, evaluate.applaud)
  },
  up: async page => {
    await util.test(page, evaluate.up)
  },
  down: async page => {
    await util.test(page, evaluate.down)
  },
  clear: async page => {
    await util.test(page, evaluate.clear)
  },
  promote: async page => {
    await util.test(page, evaluate.promote)
  },
  demote: async page => {
    await util.test(page, evaluate.demote)
  },
  kick: async page => {
    await util.test(page, evaluate.kick)
  }
}
