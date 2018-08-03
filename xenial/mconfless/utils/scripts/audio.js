/**
 * @name Audio
 *
 * @desc Join audio bots in a meeting
 */

const puppeteer = require('puppeteer')
const selectorTimeout = 60000 // 60 seconds
const url = HOST + '/demo/demoHTML5.jsp?action=create' +
    '&username=Boty+McBotface' +
    '&meetingname=' + encodeURI(ROOM)
const delay = ms => { new Promise(resolve => setTimeout(resolve, ms)) }

async function click(page, element) {
  await page.waitForSelector(element, { timeout: selectorTimeout })
  await page.click(element)
}

(async () => {
  puppeteer.launch({
    executablePath: 'google-chrome-unstable',
    args: [
      '--disable-dev-shm-usage',
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      '--use-file-for-fake-audio-capture=/home/pptruser/alternative-audio.wav'
    ]
  }).then(async browser => {
    const promises = []
    for (let i = 0; i < BOTS; i++) {
      await delay(WAIT)
      promises.push(browser.newPage().then(async page => {
        console.log('Spawning bot', i)
        await page.goto(url)
        await click(page, '[aria-label="Microphone"]')
        await click(page, '[aria-label="Echo is audible"]')
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
