const axios = require('axios').default;
const https = require('https');

const FetchException = require('../exceptions/FetchException');
const { FETCH } = require('../constants/error-code');

const memCache = require('../../simple-cache/Cache');

const cccache = memCache.createCache('LRU', 10000);

async function crawlPage(url, timeout = 5000) {
  let res = cccache.get(url);
  if (!res) {
    res = await craw(url, timeout);
    cccache.set(url, res, 1000 * 60 * 60 * 4); //存放4小时
  }
  return res;
}

const baseAxios = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  responseType: 'arraybuffer', //不对抓取的数据进行编码解析
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
    Connection: 'keep-alive',
    'content-type': 'application/x-www-form-urlencoded',
    Referer: 'https://www.baidu.com',
  },
});

const getSource = (timeout) => {
  const source = axios.CancelToken.source();
  setTimeout(() => {
    source.cancel();
  }, timeout);
  return source.token;
};

async function postCrawl(url, payload, timeout = 5000) {
  try {
    const result = await baseAxios.post(url, payload, {
      cancelToken: getSource(timeout),
    });
    return result.data;
  } catch (error) {
    console.log(error.message);
    throw new FetchException(FETCH, `timeout ${timeout}ms exceed`);
  }
}

async function craw(url, timeout = 5000) {
  try {
    const result = await baseAxios.get(url, {
      cancelToken: getSource(timeout),
    });
    return result.data;
  } catch (error) {
    console.log(error.message);
    throw new FetchException(FETCH, `timeout ${timeout}ms exceed`);
  }
}

exports.craw = craw;
exports.postCrawl = postCrawl;
exports.crawlPage = crawlPage;
