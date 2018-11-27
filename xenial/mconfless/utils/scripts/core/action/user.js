/**
 * @name User
 *
 * @desc Collection of bot user actions
 */

const conf = require('../conf.js')
const util = require('../util.js')

const user = conf.label.user

const evaluate = {
  open: {
    description: 'open users list',
    test: async page => await util.visible(page, user.panel)
  },
  close: {
    description: 'close users list',
    test: async page => await util.hidden(page, user.panel)
  },
  away: {
    description: 'user away status',
    test: async page => await util.visible(page, user.status.avatar.away)
  },
  hand: {
    description: 'user raise hand status',
    test: async page => await util.visible(page, user.status.avatar.hand)
  },
  undecided: {
    description: 'user undecided status',
    test: async page => await util.visible(page, user.status.avatar.undecided)
  },
  confused: {
    description: 'user confused status',
    test: async page => await util.visible(page, user.status.avatar.confused)
  },
  sad: {
    description: 'user sad status',
    test: async page => await util.visible(page, user.status.avatar.sad)
  },
  happy: {
    description: 'user happy status',
    test: async page => await util.visible(page, user.status.avatar.happy)
  },
  applaud: {
    description: 'user applaud status',
    test: async page => await util.visible(page, user.status.avatar.applaud)
  },
  up: {
    description: 'user thumbs up status',
    test: async page => await util.visible(page, user.status.avatar.up)
  },
  down: {
    description: 'user thumbs down status',
    test: async page => await util.visible(page, user.status.avatar.down)
  },
  clear: {
    description: 'clear user status',
    test: async page => await util.visible(page, user.status.avatar.clear)
  },
  promote: {
    description: 'promote user',
    test: async page => true
  },
  demote: {
    description: 'demote user',
    test: async page => true
  },
  kick: {
    description: 'kick user',
    test: async page => true
  }
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
