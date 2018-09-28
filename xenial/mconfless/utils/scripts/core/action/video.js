/**
 * @name Video
 *
 * @desc Collection of bot video actions
 */

const conf = require('../conf.js')
const util = require('../util.js')

const video = conf.label.video

module.exports = {
  join: async function(page) {
    await util.click(page, video.open, true)
    await util.click(page, video.menu.share)
  },
  leave: async function(page) {},
  focus: async function(page) {},
  stats: async function(page) {},
  swap: async function(page) {}
}
