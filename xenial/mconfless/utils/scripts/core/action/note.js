/**
 * @name Note
 *
 * @desc Collection of bot note actions
 */

const conf = require('../conf.js')
const util = require('../util.js')

const note = conf.label.note
const data = conf.config.data

module.exports = {
  open: async page => await util.click(page, note.open, true),
  close: async page => await util.click(page, note.close),
  write: async (page, id) => {
    let notes = data.note
    const frame = await util.frame(page, note.frame.name, true)
    for (let i = 0; i < notes.length; i++) {
      let text = "\n" + util.identify(id, notes[i])
      await util.write(frame, note.frame.pad, text)
    }
  },
}
