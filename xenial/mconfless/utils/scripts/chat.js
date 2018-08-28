/**
 * @name Chat
 *
 * @desc Join chat bots in a meeting
 */

const puppeteer = require('puppeteer')
const utils =  require('./scripts/utils.js')
const config = require('./scripts/config/config.json')

const chat = config.element.chat
const audio = config.element.audio
const url = HOST + config.demo.html.url +
    config.demo.html.user + 'Boty+McBotface' +
    config.demo.html.meeting + encodeURI(ROOM)
const messages = config.chat.messages
const chatSize = Math.round(LIFE / config.timeout.input)

let run = async () => {
  puppeteer.launch({
    executablePath: config.browser.path,
    headless: config.browser.headless,
    args: [
      '--disable-dev-shm-usage'
    ]
  }).then(async browser => {
    const promises = []
    for (let i = 0; i < BOTS; i++) {
      await utils.delay(WAIT)
      promises.push(browser.newPage().then(async page => {
        console.log('Spawning bot', i)
        await page.goto(url)
        await utils.click(page, audio.dialog.close)
        await page.waitFor(config.timeout.relief)
        await utils.click(page, chat.open)
        for (let j = 0; j < chatSize; j++) {
          await utils.type(page, chat.form.input,  messages[j % messages.length])
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
