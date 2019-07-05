
var AV = require('leanengine');
var { craw } = require('./util/http-req');

const webSite = process.env.SELF_WEBSITE || 'http://localhost:3000';

AV.Cloud.define('hello', function (request) {
  return 'Hello world!';
});

AV.Cloud.define('serverStart', function (request) {
  console.log(`服务器将持续运行 - 15小时`);
  start(15 * 60);
  return '';
});

let timer = null;
let lessTime = 0;

function start(tim) {
  if (timer == null) {
    lessTime = tim - 20;
    craw(webSite); // 先抓一发，开启服务器，接下来再定时
    timer = setInterval(() => {
      lessTime -= 20;
      if (lessTime <= 0) {
        clearInterval(timer);
        timer = null;
      } else {
        craw(webSite).catch(e => {});
      }
    }, 1200000);
  } else console.log('already running.');

}
