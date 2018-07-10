/**
 * @name Listen-Only
 *
 * @desc Join listen-only bots in a meeting
 */

const puppeteer = require('puppeteer')
const url = HOST + '/demo/demoHTML5.jsp?action=create' +
    '&username=Boty+McBotface' +
    '&meetingname=' + encodeURI(ROOM)

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

(async () => {
  puppeteer.launch({
    executablePath: 'google-chrome-unstable',
    args: [
      '--disable-dev-shm-usage'
    ]
  }).then(async browser => {
    const promises = []
    for (let i = 0; i < BOTS; i++) {
      console.log('Bot spawned', i)
      await sleep(WAIT)
      promises.push(browser.newPage().then(async page => {
        await page.goto(url)
        await page.waitForSelector('[aria-label="Listen Only"]', { timeout: 0 })
        await page.click('[aria-label="Listen Only"]')
        await page.waitFor(LIFE)
      }))
    }
    await Promise.all(promises)
    await browser.close()
  })
})()
