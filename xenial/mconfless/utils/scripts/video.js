/**
 * @name Video
 *
 * @desc Join video bots in a meeting
 */

const action = require('./core/action.js')
const run = require('./core/run.js')

let actions = async (page) => {
  await action.audio.close(page)
  await action.video.join(page)
}

run(actions)
