/**
 * @name Video
 *
 * @desc Collection of bot video actions
 */

const conf = require('../conf.js')
const util = require('../util.js')

const video = conf.label.video

module.exports = {
  join: async page => {
    await util.click(page, video.open, true)
    await util.click(page, video.menu.share)
    await util.click(page, video.settings.start, true)
  },
  leave: async page => {
    await util.click(page, video.open, true)
    await util.click(page, video.menu.unshare)
  },
  focus: async page => {},
  stats: async page => {},
  swap: async page => {
    await util.click(page, video.open, true)
    await util.click(page, video.menu.swap)
  }
}
