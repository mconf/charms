/**
 * @name Audio
 *
 * @desc Join audio bots in a meeting
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
      '--use-file-for-fake-audio-capture=/home/pptruser/audio.wav'
    ]
  }).then(async browser => {
    const promises = []
    for (let i = 0; i < parallel; i++) {
      console.log('Bot spawned', i)
      await sleep(2000)
      promises.push(browser.newPage().then(async page => {
        await page.goto(url)
        await page.waitForSelector('[aria-label="Microphone"]', { timeout: 0 })
        await page.click('[aria-label="Microphone"]')
        await page.waitForSelector('[aria-label="Echo is audible"]', { timeout: 0 })
        await page.click('[aria-label="Echo is audible"]')
        await page.waitFor(300000)
      }))
    }
    await Promise.all(promises)
    await browser.close()
  })
})()
