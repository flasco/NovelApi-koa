
var AV = require('leanengine');
var { craw } = require('./util/HttpReq');

const webSite = process.env.SELF_WEBSITE || 'http://localhost:3000';

AV.Cloud.define('hello', function (request) {
  return 'Hello world!';
});

AV.Cloud.define('serverStart', function (request) {
  console.log(`服务器将持续运行 - 15小时`);
  start(15 * 60);
  return '';
});

function start(tim) {
  tim -= 20;
  craw(webSite); // 先抓一发，开启服务器，接下来再定时
  let timer = setInterval((tim) => {
    tim -= 20;
    if(tim <= 0){
      clearInterval(timer);
    }else {
      craw(webSite, 400);
    }
  }, 1200000);
}
