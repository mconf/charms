/**
 * @name Audio&Video
 *
 * @desc Join audio and video bots in a meeting
 */

const genericPool = require('generic-pool')
const puppeteer = require('puppeteer')
const utils = require('./utils.js')
const config = require('./config/config.json')

const pool = config.browser.pool
const bot = config.bot
const audio = config.element.audio
const video = config.element.video
const poolSize = Math.ceil(bot.population / pool.population)

let run = async () => {
  const factory = {
    create: async () => {
      return await puppeteer.launch({
        executablePath: config.browser.path,
        headless: config.browser.headless,
        args: [
          '--disable-dev-shm-usage',
          '--use-fake-ui-for-media-stream',
          '--use-fake-device-for-media-stream',
          config.browser.media.audio,
          config.browser.media.video
        ]
      })
    },
    destroy: function(puppeteer) {
      puppeteer.close()
    },
  }

  const browserPool = genericPool.createPool(factory, { max: pool.size.max, min: pool.size.min })

  for (let i = 0; i < poolSize; i++) {
    browserPool.acquire().then(async browser => {
      console.log('Spawning browser', i)
      let promises = []
      for (let j = 0; j < pool.population; j++) {
        await utils.delay(bot.wait)
        promises.push(browser.newPage().then(async page => {
          console.log('Spawning bot', (i * pool.population) + j)
          await page.goto(utils.url)
          await utils.click(page, audio.dialog.microphone)
          await utils.click(page, audio.echo.confirm)
          await page.waitFor(config.timeout.relief)
          await utils.click(page, video.open)
          await utils.click(page, video.menu.share)
          await page.waitFor(bot.lifespan)
        }).catch(error => {
          console.warn('Execution error caught with bot', (i * pool.population) + j)
          return error
        }))
      }
      await Promise.all(promises).then(async () => {
        await browser.close()
      })
    })
    await utils.delay(bot.wait * pool.population)
  }
}

run()
