const router = require('koa-router')()
const readFile = r(APP.L, 'readFile')
const formatPaging = r(APP.M, 'formatPaging')

// router.prefix('/api');
router.get('/movie/science', async ctx => {
  const totalData = readFile('movie.json')
  const formatData = await formatPaging(ctx, totalData)
  ctx.body = formatData
})

module.exports = router.routes()