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

const once = async (page, event, callback) => {
  return new Promise((resolve, reject) => {
    let fired = false
    setTimeout(() => {
      if (!fired) reject('Event listener timeout: ' + event)
    }, timeout.selector)
    const handler = () => {
      fired = true
      callback()
    }
    page.once(event, handler)
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
      const check = () => {
        const frame = page.frames().find(f => f.name() === name)
        if (frame) resolve(frame)
        once(page, 'framenavigated', check).catch(error => reject(error))
      }
      check()
    })
  },
  test: async (page, evaluate) => {
    if (config.test.enabled) {
      await delay(config.delay.relief)
      const accepted = await evaluate(page)
      if (accepted) {
        console.log('\x1b[32m%s\x1b[0m', 'PASS', evaluate.name)
      } else {
        console.log('\x1b[31m%s\x1b[0m', 'FAIL', evaluate.name)
        let filename = evaluate.name + '-' + token() + '.png'
        await page.screenshot({ path: config.screenshot.path + filename })
      }
    }
  },
  visible: async (page, element) => {
    let visible
    await page.waitForSelector(element, { timeout: config.delay.relief })
      .then(() => visible = true)
      .catch(() => visible = false)
    return visible
  },
  hidden: async (page, element) => {
    let hidden
    await page.waitForSelector(element, { timeout: config.delay.relief })
      .then(() => hidden = false)
      .catch(() => hidden = true)
    return hidden
  }
}
