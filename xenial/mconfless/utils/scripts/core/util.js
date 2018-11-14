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
const identify = (id, data) => ('0' + id).slice(-2) + ' - ' + data

const once = async (page, name, callback) => {
  return new Promise((resolve, reject) => {
    let fired = false
    setTimeout(() => {
      if (!fired) reject('Event listener timeout: ' + name)
    }, timeout.selector)
    handler = () => {
      fired = true
      callback()
    }
    page.once(name, handler)
  })
}

module.exports = {
  identify: identify,
  delay: delay,
  url: (id) => {
    const user = url.userTag + encodeURI(identify(id, url.user))
    const meeting = url.meetingTag + encodeURI(url.meeting)
    return url.host + url.demo + user + meeting
  },
  click: async (page, element, relief = false) => {
    if (relief) await delay(config.delay.relief)
    await page.waitForSelector(element, { timeout: timeout.selector })
    await page.click(element)
  },
  type: async (page, element, text, relief = false) => {
    if (relief) await delay(config.delay.relief)
    await page.waitForSelector(element, { timeout: timeout.selector })
    await page.type(element, text)
  },
  write: async (page, element, text) => {
    await page.waitForSelector(element, { timeout: timeout.selector })
    await page.type(element, text, { delay: config.delay.type })
  },
  screenshot: async page => {
    if (config.screenshot.enabled) {
      await page.screenshot({ path: config.screenshot.path + token() + '.png' })
    }
  },
  frame: async (page, name, relief = false) => {
    if (relief) await delay(config.delay.relief)
    return new Promise((resolve, reject) => {
      function check() {
        const frame = page.frames().find(f => f.name() === name)
        if (frame) resolve(frame)
        once(page, 'framenavigated', check).catch(error => reject(error))
      }
      check()
    })
  },
}
