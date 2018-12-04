/**
 * @name Note
 *
 * @desc Join note bots in a meeting
 */

const action = require('./core/action.js')
const run = require('./core/run.js')

let actions = async (page, id) => {
  await action.audio.close(page)
  await action.note.open(page)
  await action.note.write(page, id)
}

run(actions)
