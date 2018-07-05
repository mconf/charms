/**
 * @name Listen-Only
 *
 * @desc Join listen-only bots in a meeting
 */

const puppeteer = require('puppeteer')
const parallel = 5
const url = 'http://html5.dev.mconf.com/demo/demoHTML5.jsp?action=create&meetingname=Test+Room&username=Boty+McBotface'

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
    for (let i = 0; i < parallel; i++) {
      console.log('Bot spawned', i)
      await sleep(2000)
      promises.push(browser.newPage().then(async page => {
        await page.goto(url)
        await page.waitForSelector('[aria-label="Listen Only"]', { timeout: 0 })
        await page.click('[aria-label="Listen Only"]')
        await page.waitFor(300000)
      }))
    }
    await Promise.all(promises)
    await browser.close()
  })
})()
