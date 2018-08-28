/**
 * @name Audio
 *
 * @desc Join audio bots in a meeting
 */

const puppeteer = require('puppeteer')
const utils = require('./scripts/utils.js')
const config = require('./scripts/config/config.json')

const audio = config.element.audio
const url = HOST + config.demo.html.url +
    config.demo.html.user + 'Boty+McBotface' +
    config.demo.html.meeting + encodeURI(ROOM)

let run = async () => {
  puppeteer.launch({
    executablePath: config.browser.path,
    headless: config.browser.headless,
    args: [
      '--disable-dev-shm-usage',
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      config.browser.media.audio
    ]
  }).then(async browser => {
    const promises = []
    for (let i = 0; i < BOTS; i++) {
      await utils.delay(WAIT)
      promises.push(browser.newPage().then(async page => {
        console.log('Spawning bot', i)
        await page.goto(url)
        await utils.click(page, audio.dialog.microphone)
        await utils.click(page, audio.echo.confirm)
        await page.waitFor(LIFE)
      }).catch(error => {
        console.warn('Execution error caught with bot', i)
        return error
      }))
    }
    await Promise.all(promises).then(async () => {
      await browser.close()
    })
  })
}

run()
