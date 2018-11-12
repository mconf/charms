/**
 * @name Action
 *
 * @desc Collection of bot actions
 */

const audio = require('./action/audio.js')
const video = require('./action/video.js')
const chat = require('./action/chat.js')
const note = require('./action/note.js')

module.exports = {
  audio: audio,
  video: video,
  chat: chat,
  note: note
}
