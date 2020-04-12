const Koa = require('koa');
const path = require('path');
const views = require('koa-views');
const onerror = require('koa-onerror');
const staticServer = require('koa-static');

const routes = require('./routes');
const middleware = require('./middleware');

require('./cloud'); // 包含云函数

const app = new Koa();

const isDev = process.env.NODE_ENV === 'development';

const allowedSite = isDev ? '*' : 'https://flasco.gitee.io';

onerror(app); //错误详细处理

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Allow-Origin', allowedSite);
  //允许的header类型
  ctx.set('Access-Control-Allow-Headers', 'x-requested-with,content-type');
  //跨域允许的请求方式
  ctx.set('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
  if (ctx.method.toLowerCase() == 'options') ctx.body = 200;
  //让options尝试请求快速结束
  else await next();
});

app.use(middleware); //中间件加载

app.use(views(path.join(__dirname, './views'), { extension: 'ejs' })); //视图加载

app.use(
  staticServer(path.join(__dirname, './public'), {
    maxage: 1000 * 60 * 60 * 24 * 30,
    hidden: true,
    gzip: true
  })
); //静态资源加载

app.use(routes.routes(), routes.allowedMethods()); // 路由加载

app.on('error', err => {
  console.error(new Date(), err.message);
});

module.exports = app;
