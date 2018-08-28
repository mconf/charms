/**
 * @name Utils
 *
 * @desc Collection of common functions
 */

const config = require('./config/config.json')

module.exports = {
  delay: async function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  },
  click: async function(page, element) {
    await page.waitForSelector(element, { timeout: config.timeout.selector })
    await page.click(element)
  },
  type: async function(page, element, text) {
    await this.delay(config.timeout.input)
    await page.waitForSelector(element, { timeout: config.timeout.selector })
    await page.type(element, text)
  }
}
