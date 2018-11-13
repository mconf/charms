/**
 * @name Listen-Only
 *
 * @desc Join listen-only bots in a meeting
 */

const action = require('./core/action.js')
const run = require('./core/run.js')

let actions = async (page, id) => await action.audio.listen(page)

run(actions)
