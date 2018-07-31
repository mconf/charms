/**
 * @name Join
 *
 * @desc Join bots in a Flash meeting
 */

const puppeteer = require('puppeteer')
const url = HOST + '/demo/demo1.jsp?action=create' +
    '&username=Boty+McBotface' +
    '&meetingname=' + encodeURI(ROOM)

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

(async () => {
  puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
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
      console.log('Bot spawned', i)
      await sleep(WAIT)
      promises.push(browser.newPage().then(async page => {
        await page.goto(url)
        await page.waitFor(LIFE)
      }))
    }
    await Promise.all(promises)
    await browser.close()
  })
})()
