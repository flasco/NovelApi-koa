const compose = require('koa-compose');
const bodyParser = require('koa-bodyparser');
const AV = require('leanengine');
const logger =require('./logger');
const cache =require('./cache');

module.exports = compose([
    logger(),
    AV.koa2(),
    bodyParser(), //当接受post请求之时将获取的参数放置在 request.body 里面。
    cache(),
  ]);