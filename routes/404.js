const router = require('koa-router')()

// router.prefix('/api');
router.get('*', async ctx => {
  ctx.body = {
    code: 404,
    message: 'not found'
  }
})

module.exports = router.routes()