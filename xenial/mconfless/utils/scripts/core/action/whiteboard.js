/**
 * @name Whiteboard
 *
 * @desc Collection of bot whiteboard actions
 */

const conf = require('../conf.js')
const util = require('../util.js')

const whiteboard = conf.label.whiteboard
const data = conf.config.data

const point = box => ({ x: box.x + (Math.random() * box.width), y: box.y + (Math.random() * box.height) })

const draw = async (page, tool) => {
  await util.click(page, whiteboard.tools.open, true)
  await util.click(page, tool, true)

  const board = await page.$(whiteboard.board)
  const box = await board.boundingBox()

  const start = point(box)
  await page.mouse.move(start.x, start.y)
  await page.mouse.down()
  const finish = point(box)
  await page.mouse.move(finish.x, finish.y, { steps: data.whiteboard.steps })
  await page.mouse.up()
}

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
    await draw(page, whiteboard.tools.line)
    await util.test(page, evaluate.line)
  },
  ellipse: async page => {
    await draw(page, whiteboard.tools.ellipse)
    await util.test(page, evaluate.ellipse)
  },
  triangle: async page => {
    await draw(page, whiteboard.tools.triangle)
    await util.test(page, evaluate.triangle)
  },
  rectangle: async page => {
    await draw(page, whiteboard.tools.rectangle)
    await util.test(page, evaluate.rectangle)
  },
  pencil: async page => {
    await util.click(page, whiteboard.tools.open)
    await util.click(page, whiteboard.tools.pencil, true)

    const points = data.whiteboard.points
    const board = await page.$(whiteboard.board)
    const box = await board.boundingBox()

    let p = point(box)
    await page.mouse.move(p.x, p.y)
    await page.mouse.down()
    for (let i = 0; i < points; i++) {
      p = point(box)
      await page.mouse.move(p.x, p.y, { steps: data.whiteboard.steps })
    }
    await page.mouse.up()
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
