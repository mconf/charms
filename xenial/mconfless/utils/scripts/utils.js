/**
 * @name Utils
 *
 * @desc Collection of common functions
 */

const config = require('./config/config.json')

const timeout = config.timeout
const url = config.url

module.exports = {
  url: url.host + url.demo + url.userTag + encodeURI(url.user) + url.meetingTag + encodeURI(url.meeting),
  delay: async function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  },
  click: async function(page, element) {
    await page.waitForSelector(element, { timeout: timeout.selector })
    await page.click(element)
  },
  type: async function(page, element, text) {
    await this.delay(timeout.input)
    await page.waitForSelector(element, { timeout: timeout.selector })
    await page.type(element, text)
  }
}
