var AV = require('leanengine');
var { craw } = require('./util/HttpReq');

const webSite = process.env.SELF_WEBSITE || 'http://localhost:3000';

AV.Cloud.define('hello', function (request) {
  return 'Hello world!';
});

AV.Cloud.define('serverStart', function (request) {
  console.log(`服务器将持续运行 - 17小时`);
  start(17 * 60);
  return 'success..?';
});

function start(tim) {
  tim -= 20;
  craw(webSite); // 先抓一发，开启服务器，接下来再定时
  let timer = setInterval(() => {
    tim -= 20;
    tim <= 0 ? clearInterval(timer) : craw(webSite, 10);
  }, 1200000);
}