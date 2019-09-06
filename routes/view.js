const router = require('koa-router')()
const readFile = r(APP.L, 'readFile')

// router.prefix('/api');
router.get('/', async ctx => {
  const html = readFile('index.html', APP.V)
  ctx.body = html
})

module.exports = router.routes()