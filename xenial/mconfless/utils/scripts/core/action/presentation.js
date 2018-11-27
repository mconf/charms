/**
 * @name Presentation
 *
 * @desc Collection of bot presentation actions
 */

const conf = require('../conf.js')
const util = require('../util.js')

const presentation = conf.label.presentation

const evaluate = {
  upload: async page => true,
  change: async page => true,
  next: async page => true,
  previous: async page => true
}

module.exports = {
  upload: async page => {
    await util.test(page, evaluate.upload)
  },
  change: async page => {
    await util.test(page, evaluate.change)
  },
  next: async page => {
    await util.test(page, evaluate.next)
  },
  previous: async page => {
    await util.test(page, evaluate.previous)
  }
}
