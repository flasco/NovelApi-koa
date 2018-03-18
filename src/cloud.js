var AV = require('leanengine');
var { craw } = require('./util/HttpReq');

const webSite = process.env.SELF_WEBSITE || 'http://localhost:3000';

AV.Cloud.define('hello', function (request) {
  return 'Hello world!';
});

AV.Cloud.define('serverStart', function (request) {
  console.log(`服务器将持续运行 - 17小时`);
  start(17 * 60);
  return webSite;
});

function start(tim) {
  tim -= 20;
  craw(webSite); // 先抓一发，开启服务器，接下来再定时
  let timer = setInterval(() => {
    tim -= 20;
    tim <= 0 ?clearInterval(timer):craw(webSite);
  }, 1200);//000
  /*craw(webSite); // 去除promise的等待，避免云函数未响应导致定时器无法继续
  tim -= 20;
  if (tim > 0) {
    setTimeout(function () {
      start(tim);
    }, 1200000);
  } else {
    console.log('End---');
  }*/
}