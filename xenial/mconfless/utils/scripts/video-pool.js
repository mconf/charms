const genericPool = require('generic-pool');
const puppeteer = require('puppeteer');

const selectorTimeout = 60000 // 60 seconds
const reliefTimeout = 2000 // 2 seconds
const botsPerBrowser = 2
const numberOfBrowsers = Math.ceil(BOTS / botsPerBrowser)
const url = HOST + '/demo/demoHTML5.jsp?action=create' +
    '&username=Boty+McBotface' +
    '&meetingname=' + encodeURI(ROOM)
const delay = ms => { return new Promise(resolve => setTimeout(resolve, ms)) }

async function click(page, element) {
  await page.waitForSelector(element, { timeout: selectorTimeout })
  await page.click(element)
}

(async () => {
  const factory = {
    create: async () => {
      return await puppeteer.launch({
        executablePath: 'google-chrome-unstable',
        args: [
          '--disable-dev-shm-usage',
          '--use-fake-ui-for-media-stream',
          '--use-fake-device-for-media-stream',
          '--use-file-for-fake-video-capture=/home/pptruser/alternative-video.y4m'
        ]
      })
    },
    destroy: function(puppeteer) {
      puppeteer.close()
    },
  }

  const browserPool = genericPool.createPool(factory, { max: 10, min: 1 })

  for (let i = 0; i < numberOfBrowsers; i++) {
    browserPool.acquire().then(async browser => {
      console.log('Spawning browser', i)
      let promises = []
      for (let j = 0; j < botsPerBrowser; j++) {
        await delay(WAIT)
        promises.push(browser.newPage().then(async page => {
          console.log('Spawning bot', (i * botsPerBrowser) + j)
          await page.goto(url)
          await click(page, '[aria-label="Close"]')
          await page.waitFor(reliefTimeout)
          await click(page, '[aria-label="Open video menu dropdown"]')
          await click(page, 'img[src="/html5client/resources/images/video-menu/icon-webcam-off.svg"]')
          await page.waitFor(LIFE)
        }).catch(error => {
          console.warn('Execution error caught with bot', (i * botsPerBrowser) + j)
          return error
        }))
      }
      await Promise.all(promises).then(async () => {
        await browser.close()
      })
    })
    await delay(WAIT * botsPerBrowser)
  }
})()
