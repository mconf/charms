/**
 * @name Kurento
 *
 * @desc Join Kurento stress test
 */

const action = require('./core/action.js')
const run = require('./core/run.js')

let actions = async (page, id) => {
  await action.video.kurento(page)
}

run(actions)
