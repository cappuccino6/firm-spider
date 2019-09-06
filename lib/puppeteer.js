// puppeteer 工具的简单封装
const puppeteer = require('puppeteer')

// 生成一个浏览器
const generatePage = async () => {
  const browser = await (puppeteer.launch({
    timeout: 15000,
    ignoreHTTPSErrors: true,
    devtools: false,
    headless: false
  }))

  const page = await browser.newPage();

  return page
}

module.exports = {
  page: generatePage()
}