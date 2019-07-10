/**
 * @name Chat
 *
 * @desc Join chat bots in a meeting
 */

const action = require('./core/action.js')
const run = require('./core/run.js')

let actions = async (page, id) => {
  await action.audio.close(page)
  // If chat isn't automatically opened on join:
  // await action.chat.open(page)
  await action.chat.send(page)
}

run(actions)
