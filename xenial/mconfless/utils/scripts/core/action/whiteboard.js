/**
 * @name Whiteboard
 *
 * @desc Collection of bot whiteboard actions
 */

const conf = require('../conf.js')
const util = require('../util.js')

const whiteboard = conf.label.whiteboard

const evaluate = {
  text: {
    description: 'write textual annotation',
    test: async page => true
  },
  line: {
    description: 'draw linear annotation',
    test: async page => true
  },
  ellipse: {
    description: 'draw elliptical annotation',
    test: async page => true
  },
  triangle: {
    description: 'draw triangular annotation',
    test: async page => true
  },
  rectangle: {
    description: 'draw rectangular annotation',
    test: async page => true
  },
  pencil: {
    description: 'draw pencil annotation',
    test: async page => true
  },
  undo: {
    description: 'undo annotation',
    test: async page => true
  },
  clear: {
    description: 'clear annotations',
    test: async page => true
  }
}

module.exports = {
  text: async page => {
    await util.click(page, whiteboard.tools.open)
    await util.click(page, whiteboard.tools.text, true)
    await util.test(page, evaluate.text)
  },
  line: async page => {
    await util.click(page, whiteboard.tools.open)
    await util.click(page, whiteboard.tools.line, true)
    await util.test(page, evaluate.line)
  },
  ellipse: async page => {
    await util.click(page, whiteboard.tools.open)
    await util.click(page, whiteboard.tools.ellipse, true)
    await util.test(page, evaluate.ellipse)
  },
  triangle: async page => {
    await util.click(page, whiteboard.tools.open)
    await util.click(page, whiteboard.tools.triangle, true)
    await util.test(page, evaluate.triangle)
  },
  rectangle: async page => {
    await util.click(page, whiteboard.tools.open)
    await util.click(page, whiteboard.tools.rectangle, true)
    await util.test(page, evaluate.rectangle)
  },
  pencil: async page => {
    await util.click(page, whiteboard.tools.open)
    await util.click(page, whiteboard.tools.pencil, true)
    await util.test(page, evaluate.pencil)
  },
  undo: async page => {
    await util.click(page, whiteboard.undo)
    await util.test(page, evaluate.undo)
  },
  clear: async page => {
    await util.click(page, whiteboard.clear)
    await util.test(page, evaluate.clear)
  }
}
