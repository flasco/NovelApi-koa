const compose = require('koa-compose');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const AV = require('leanengine');

const logger = require('./logger');
const cache = require('./cache');
const json = require('./json');
const error = require('./error');

module.exports = compose([
  AV.koa2(),
  bodyParser(), //当接受post请求之时将获取的参数放置在 request.body 里面。
  cache(),
  error(),
  logger(),
  json(),
  cors({
    origin: function(ctx) {
      if (process.env.NODE_ENV === 'development') return '*';
      return 'https://flasco.gitee.io';
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
]);
