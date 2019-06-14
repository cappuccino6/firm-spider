const router = require('koa-router')()
const readFile = r(APP.L, 'readFile')

// router.prefix('/api');
router.get('/juejin/front', async ctx => {
  const frontData = readFile('juejinFront.json')
  ctx.body = frontData
})

module.exports = router.routes()