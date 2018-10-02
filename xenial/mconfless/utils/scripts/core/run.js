/**
 * @name Run
 * @param actions function
 * @desc Dispatch puppeteer and runs the actions function
 */

const util = require('./util.js')
const pool = require('./pool.js')
const conf = require('./conf.js')

const bot = conf.config.bot

const run = async actions => {
  for (let i = 0; i < pool.size; i++) {
    pool.browsers.acquire().then(async browser => {
      console.log('Spawning browser', i)
      let promises = []
      for (let j = 0; j < pool.population; j++) {
        await util.delay(bot.wait)
        promises.push(browser.newPage().then(async page => {
          console.log('Spawning bot', (i * pool.population) + j)
          await page.goto(util.url)
          await actions(page)
          await page.waitFor(bot.lifespan)
          await util.screenshot(page)
        }).catch(error => {
          console.warn('Execution error caught with bot', (i * pool.population) + j)
          return error
        }))
      }
      await Promise.all(promises).then(async () => {
        await browser.close()
      })
    })
    await util.delay(bot.wait * pool.population)
  }
}

module.exports = run
