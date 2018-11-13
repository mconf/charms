/**
 * @name Util
 *
 * @desc Collection of common functions
 */

const conf = require('./conf.js')

const config = conf.config
const timeout = config.timeout
const url = config.url

const delay = async time => new Promise(resolve => setTimeout(resolve, time))
const token = () => Math.random().toString(36).substring(2, 15)
const identificate = (id, data) => ("0" + id).slice(-2) + ": " + data

module.exports = {
  url: (id) => url.host + url.demo + url.userTag + encodeURI(identificate(id, url.user)) + url.meetingTag + encodeURI(url.meeting),
  delay: delay,
  click: async (page, element, relief = false) => {
    if (relief) await delay(timeout.relief)
    await page.waitForSelector(element, { timeout: timeout.selector })
    await page.click(element)
  },
  type: async (page, element, text, relief = false) => {
    if (relief) await delay(timeout.relief)
    await page.waitForSelector(element, { timeout: timeout.selector })
    await page.type(element, text)
  },
  write: async (page, element, id, text) => {
    await page.waitForSelector(element, { timeout: timeout.selector })
    await page.type(element, "\n" + identificate(id, text), { delay: 100 })
  },
  screenshot: async page => {
    if (config.screenshot.enabled) {
      await page.screenshot({ path: config.screenshot.path + token() + '.png' })
    }
  },
  frame: async (page, name, relief = false) => {
    if (relief) await delay(timeout.relief)
    return new Promise(resolve => {
      function check() {
        const frame = page.frames().find(f => f.name() === name)
        if (frame) {
          resolve(frame)
        } else {
          page.once('framenavigated', check)
        }
      }
      check()
    })
  },
}
