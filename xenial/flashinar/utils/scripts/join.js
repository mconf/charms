/**
 * @name Join
 *
 * @desc Join bots in a Flash meeting
 */

const puppeteer = require('puppeteer')
const url = HOST + '/demo/demo3.jsp?action=create' +
    '&username=Boty+McBotface' +
    '&meetingID=' + encodeURI(ROOM) +
    '&password=student123'
const delay = ms => { return new Promise(resolve => setTimeout(resolve, ms)) }

(async () => {
  puppeteer.launch({
    executablePath: 'google-chrome-unstable',
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--ppapi-flash-version=30.0.0.134',
      '--ppapi-flash-path=/home/pptruser/.config/google-chrome/PepperFlash/30.0.0.134/libpepflashplayer.so',
      '--user-data-dir=/home/pptruser/.config/google-chrome'
    ]
  }).then(async browser => {
    const promises = []
    for (let i = 0; i < BOTS; i++) {
      await delay(WAIT)
      promises.push(browser.newPage().then(async page => {
        console.log('Spawning bot', i)
        await page.goto(url)
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
})()
