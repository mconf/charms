/**
 * @name Audio
 *
 * @desc Join audio bots in a meeting
 */

const puppeteer = require('puppeteer')
const utils = require('./utils.js')
const config = require('./config/config.json')

const bot = config.bot
const audio = config.ui.audio

let run = async () => {
  puppeteer.launch({
    executablePath: config.browser.path,
    headless: config.browser.headless,
    args: [
      '--disable-dev-shm-usage',
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      '--use-file-for-fake-audio-capture=' + config.data.audio
    ]
  }).then(async browser => {
    const promises = []
    for (let i = 0; i < bot.population; i++) {
      await utils.delay(bot.wait)
      promises.push(browser.newPage().then(async page => {
        console.log('Spawning bot', i)
        await page.goto(utils.url)
        await utils.click(page, audio.dialog.microphone)
        await utils.click(page, audio.echo.confirm)
        await page.waitFor(bot.lifespan)
        await utils.screenshot(page)
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
