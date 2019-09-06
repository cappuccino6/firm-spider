const router = require('koa-router')()
const readFile = r(APP.L, 'readFile')

// router.prefix('/api');
router.get('/redBook/travel', async ctx => {
  const data = readFile('redBook.json')
  ctx.body = data
})

module.exports = router.routes()