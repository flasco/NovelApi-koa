const compose = require('koa-compose');
const bodyParser = require('koa-bodyparser');
const AV = require('leanengine');

const logger = require('./logger');
const cache = require('./cache');
const json = require('./json');
const error = require('./error');

module.exports = compose([
  bodyParser(), //当接受post请求之时将获取的参数放置在 request.body 里面。
  error(),
  logger(),
  json(),
  AV.koa2(),
  cache(), // cache 在最底层
]);
