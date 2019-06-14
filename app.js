const Koa = require('koa')
const debug = require('debug')('Juejin-Spider')
const config = require('./config')
const juejinFront = r(APP.S, 'juejinFront')
const app = new Koa()

debug('start')
juejinFront()

// app.listen(config.port)
