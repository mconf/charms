/**
 * @name Whiteboard
 *
 * @desc Collection of bot whiteboard actions
 */

const conf = require('../conf.js')
const util = require('../util.js')

const whiteboard = conf.label.whiteboard

const evaluate = {
  text: async page => true,
  line: async page => true,
  ellipse: async page => true,
  triangle: async page => true,
  rectangle: async page => true,
  pencil: async page => true,
  undo: async page => true,
  clear: async page => true
}

module.exports = {
  text: async page => {
    await util.test(page, evaluate.text)
  },
  line: async page => {
    await util.test(page, evaluate.line)
  },
  ellipse: async page => {
    await util.test(page, evaluate.ellipse)
  },
  triangle: async page => {
    await util.test(page, evaluate.triangle)
  },
  rectangle: async page => {
    await util.test(page, evaluate.rectangle)
  },
  pencil: async page => {
    await util.test(page, evaluate.pencil)
  },
  undo: async page => {
    await util.test(page, evaluate.undo)
  },
  clear: async page => {
    await util.test(page, evaluate.clear)
  }
}
