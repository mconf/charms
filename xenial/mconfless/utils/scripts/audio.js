/**
 * @name Audio
 *
 * @desc Join audio bots in a meeting
 */

const action = require('./core/action.js')
const run = require('./core/run.js')

let actions = async page => await action.audio.join(page)

run(actions)
