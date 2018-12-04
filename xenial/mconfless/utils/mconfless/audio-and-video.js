/**
 * @name Audio-and-Video
 *
 * @desc Join audio and video bots in a meeting
 */

const action = require('./core/action.js')
const run = require('./core/run.js')

let actions = async (page, id) => {
  await action.audio.microphone(page)
  await action.video.join(page)
}

run(actions)
