/**
 * @name Chat
 *
 * @desc Join chat bots in a meeting
 */

const puppeteer = require('puppeteer')
const utils =  require('./utils.js')
const config = require('./config/config.json')

const bot = config.bot
const chat = config.ui.chat
const audio = config.ui.audio
const messages = config.data.chat
const chatSize = Math.round(bot.lifespan / config.timeout.relief)

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
        await utils.click(page, audio.dialog.close)
        await utils.click(page, chat.open, true)
        for (let j = 0; j < chatSize; j++) {
          await utils.type(page, chat.form.input, messages[j % messages.length], true)
          await utils.click(page, chat.form.send)
        }
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
