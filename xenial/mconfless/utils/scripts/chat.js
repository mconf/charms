/**
 * @name Chat
 *
 * @desc Join chat bots in a meeting
 */

const puppeteer = require('puppeteer')
const selectorTimeout = 60000 // 60 seconds
const reliefTimeout = 2000 // 2 seconds
const timeBetweenMessages = 500 // 0,5 second
const numberOfMessages = Math.round(LIFE / timeBetweenMessages)
const url = HOST + '/demo/demoHTML5.jsp?action=create' +
    '&username=Boty+McBotface' +
    '&meetingname=' + encodeURI(ROOM)
const delay = ms => { return new Promise(resolve => setTimeout(resolve, ms)) }
const messages = [
  'Siga em frente...',
  '... olhe para o lado',
  'Se liga no mestiço...',
  '... na batida do cavaco'
]

async function click(page, element) {
  await page.waitForSelector(element, { timeout: selectorTimeout })
  await page.click(element)
}

async function type(page, element, index) {
  await delay(timeBetweenMessages)
  await page.waitForSelector(element, { timeout: selectorTimeout })
  await page.type(element, messages[index % messages.length])
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
      await delay(WAIT)
      promises.push(browser.newPage().then(async page => {
        console.log('Spawning bot', i)
        await page.goto(url)
        await click(page, '[aria-label="Close"]')
        await page.waitFor(reliefTimeout)
        await click(page, 'a[href="/html5client/users/chat/public"]')
        for (let j = 0; j < numberOfMessages; j++) {
          await type(page, '#message-input', j)
          await click(page, '[aria-label="Send Message"]')
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
})()
