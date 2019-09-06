const path = require('path')
const router = require('koa-router')()
const readFile = r(APP.L, 'readFile')
const formatPaging = r(APP.M, 'formatPaging')

// router.prefix('/api');
router.get('/movie/:type', async ctx => {
  const {type} = ctx.params
  const totalData = readFile(`${type}Movie.json`, path.join(APP.D, 'movie'))
  const formatData = await formatPaging(ctx, totalData)
  ctx.body = formatData
})

module.exports = router.routes()