const axios = require('axios');

const FetchException = require('../exceptions/FetchException');
const { FETCH } = require('../constants/error-code');

const memCache = require('../../simple-cache/Cache');

const cccache = memCache.createCache('LRU', 10000);

async function crawlPage(urlx) {
  let res = cccache.get(urlx);
  if (!res) {
    res = await craw(urlx);
    cccache.set(urlx, res, 1000 * 60 * 60 * 4); //存放4小时
  }
  return res;
}

async function craw(urlx, timeout = 5000) {
  try {
    const { data } = await axios.get(urlx, {
      responseType: 'arraybuffer', //不对抓取的数据进行编码解析
      timeout,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
        Connection: 'keep-alive',
        Referer: 'https://www.baidu.com'
      }
    });
    return data;
  } catch (error) {
    throw new FetchException(FETCH, `timeout ${timeout}ms exceed`);
  }
}

exports.craw = craw;
exports.crawlPage = crawlPage;
