/**
 * @name Util
 *
 * @desc Collection of common functions
 */

const conf = require('./conf.js')

const config = conf.config
const timeout = config.timeout
const url = config.url

const token = () => Math.random().toString(36).substring(2, 15)

module.exports = {
  url: url.host + url.demo + url.userTag + encodeURI(url.user) + url.meetingTag + encodeURI(url.meeting),
  delay: async time => new Promise(resolve => setTimeout(resolve, time)),
  click: async (page, element, relief = false) => {
    if (relief) await this.delay(timeout.relief)
    await page.waitForSelector(element, { timeout: timeout.selector })
    await page.click(element)
  },
  type: async (page, element, text, relief = false) => {
    if (relief) await this.delay(timeout.relief)
    await page.waitForSelector(element, { timeout: timeout.selector })
    await page.type(element, text)
  },
  screenshot: async page => {
    if (config.screenshot.enabled) {
      await page.screenshot({ path: config.screenshot.path + token() + '.png' })
    }
  }
}
