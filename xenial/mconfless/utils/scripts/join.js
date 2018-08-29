/**
 * @name Join
 *
 * @desc Join bots in a HTML5 meeting
 */

const puppeteer = require('puppeteer')
const utils = require('./utils.js')
const config = require('./config/config.json')

const bot = config.bot

let run = async () => {
  puppeteer.launch({
    executablePath: config.browser.path,
    headless: config.browser.headless,
    args: [
      '--disable-dev-shm-usage'
    ]
  }).then(async browser => {
    const promises = []
    for (let i = 0; i < bot.population; i++) {
      await utils.delay(bot.wait)
      promises.push(browser.newPage().then(async page => {
        console.log('Spawning bot', i)
        await page.goto(utils.url)
        await page.waitFor(bot.lifespan)
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
