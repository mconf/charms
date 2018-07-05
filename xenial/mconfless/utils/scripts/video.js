/**
 * @name Video
 *
 * @desc Join video bots in a meeting
 */

const puppeteer = require('puppeteer')
const parallel = 1
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
      '--disable-dev-shm-usage',
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      '--use-file-for-fake-video-capture=/home/pptruser/alternative-video.y4m'
    ]
  }).then(async browser => {
    const promises = []
    for (let i = 0; i < parallel; i++) {
      console.log('Bot spawned', i)
      await sleep(2000)
      promises.push(browser.newPage().then(async page => {
        await page.goto(url)
        await page.waitForSelector('[aria-label="Close"]', { timeout: 0 })
        await page.click('[aria-label="Close"]')
        await page.waitFor(2000)
        await page.waitForSelector('[aria-label="Open video menu dropdown"]', { timeout: 0 })
        await page.click('[aria-label="Open video menu dropdown"]')
        await page.waitForSelector('img[src="/html5client/resources/images/video-menu/icon-webcam-off.svg"]', { timeout: 0 })
        await page.click('img[src="/html5client/resources/images/video-menu/icon-webcam-off.svg"]')
        await page.waitFor(300000)
      }))
    }
    await Promise.all(promises)
    await browser.close()
  })
})()
