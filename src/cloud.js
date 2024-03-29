const AV = require('leanengine');
const schedule = require('node-schedule');

const { craw } = require('./util/http-req');
const { delay } = require('./util');

const webSite = process.env.SELF_WEBSITE || 'http://localhost:3001';
const runTime = process.env.RUN_TIME || '7-21'; // 2

AV.Cloud.define('hello', function () {
  console.log('action??');
  return 'Hello world!';
});

AV.Cloud.define('serverStart', (req, res) => {
  return 'hello!';
});

let [TStart, TEnd] = runTime.split('-').map((i) => +i);

schedule.scheduleJob(`0 0 ${TStart} * * *`, () => {
  start();
});

let isRunning = false;

async function start() {
  console.log(webSite);
  if (isRunning) {
    return console.log('已经在执行了.');
  }

  let currentHour = (new Date().getUTCHours() + 8) % 24;
  console.log('current hour[utc+8]:', currentHour);

  if (TEnd < TStart) TEnd += 24;
  if (TEnd - currentHour > 24) currentHour += 24;

  if (currentHour > TEnd || currentHour < TStart) {
    return console.log(`不在预期的运行时间，运行时: ${runTime}`);
  }
  const needTime = TEnd - currentHour;
  console.log(`持续运行 - ${needTime}H，运行时: ${runTime}`);

  const mps = 20; // minutes Per Step
  const count = (needTime * 60) / mps;
  const step = mps * 60 * 1000;
  isRunning = true;
  await delay(60 * 1000); // 停 1 分钟再来
  for (let i = 0; i < count; i++) {
    craw(webSite).catch(() => null); // 先抓一发，开启服务器，接下来再定时
    await delay(step);
  }
  console.log('fetch over!');
  isRunning = false;
}

module.exports = start;
