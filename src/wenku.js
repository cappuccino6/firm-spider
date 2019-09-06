// const puppeteer = r(APP.L, 'puppeteer')
const puppeteer = require('puppeteer')

const fetchData = async function() {
  const browser = await (puppeteer.launch({
    timeout: 15000,
    ignoreHTTPSErrors: true,
    devtools: false,
    headless: false
  }));
  const page = await browser.newPage();
  await page.goto('https://wenku.baidu.com/view/b8565bb0b9f67c1cfad6195f312b3169a551ea44.html');

  // 获取歌曲列表的 iframe
  await page.waitFor(2000);
  let iframe = await page.frames().find(f => f.name() === 'contentFrame');
  const SONG_LS_SELECTOR = await iframe.$('.srchsongst');

  // 获取歌曲 鬼才会想起 的地址
  const selectedSongHref = await iframe.evaluate(e => {
    const songList = Array.from(e.childNodes);
    const idx = songList.findIndex(v => v.childNodes[1].innerText.replace(/\s/g, '') === '鬼才会想起');
    return songList[idx].childNodes[1].firstChild.firstChild.firstChild.href;
  }, SONG_LS_SELECTOR);

  // 进入歌曲页面
  await page.goto(selectedSongHref);

  // 获取歌曲页面嵌套的 iframe
  await page.waitFor(2000);
  iframe = await page.frames().find(f => f.name() === 'contentFrame');

  // 点击 展开按钮
  const unfoldButton = await iframe.$('#flag_ctrl');
  await unfoldButton.click();

  // 获取歌词
  const LYRIC_SELECTOR = await iframe.$('#lyric-content');
  const lyricCtn = await iframe.evaluate(e => {
    return e.innerText;
  }, LYRIC_SELECTOR);

  console.log('lyricCtn', lyricCtn);

  // await page.screenshot({
  //   path: '/Users/zhengyuanbing/zyb/firm-spider/src/jian.png',
  //   type: 'png',
  //   // quality: 100, 只对jpg有效
  //   fullPage: true,
  //   // 指定区域截图，clip和fullPage两者只能设置一个
  //   // clip: {
  //   //   x: 0,
  //   //   y: 0,
  //   //   width: 1000,
  //   //   height: 40
  //   // }
  // });
  // browser.close();
}

module.exports = fetchData