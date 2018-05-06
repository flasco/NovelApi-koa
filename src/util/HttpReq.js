const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const url = require('url');
const axios = require('axios');

const conf = require('../config');
const memCache = require("../../simple-cache/Cache");

const cccache = memCache.createCache("LRU", 10000);

async function crawlPage(urlx) {
  let res = cccache.get(urlx);
  if (!res) {
    res = await craw(urlx);
    res !== '-1' && cccache.set(urlx, res, 1000 * 60 * 60 * 4); //存放4小时
  }
  return res;
}

async function craw(urlx, timeout = 5000) {
  try {
    const { data } = await axios.get(urlx, {
      responseType: 'arraybuffer',//不对抓取的数据进行编码解析
      timeout,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
        'Connection': 'keep-alive',
        'Referer': 'https://www.baidu.com',
      }
    });
    return data;
  } catch (error) {
    return '-1'
  }
}

function NovelChaper(title, url) {
  this.title = title;
  this.url = url.replace(/(.*)(\/.*\/){2}(.*)/, '$1$2$3');
}

async function getChapterList(urlx) {
  let res = await crawlPage(urlx);
  if (res === '-1') { return ''; }
  const host = url.parse(urlx).host;
  const cfg = conf.getX(host);
  if (cfg === '-1') return '暂不支持该网站';
  res = iconv.decode(res, cfg.charset)
  const $ = cheerio.load(res, { decodeEntities: false });
  let as = $(cfg.chapterListSelector);
  let arr = [], tit = new Set(), i = 0, j = 0, tex = null;
  if (host.indexOf('m.xs') !== -1) {
    i = 1;
    urlx = `https://${host}`;
  }
  while (i < as.length) {
    tex = as[i].children[0].data;
    if (!tit.has(tex)) {
      arr[j++] = new NovelChaper(tex, urlx + as[i].attribs.href);
      tit.add(tex);
    }
    i++;
  }

  if (cfg.wheSort) {
    let o1U, o2U, o1Index, o2Index;
    arr.sort(function (a, b) {
      o1U = a.url;
      o2U = b.url;
      o1Index = o1U.substring(o1U.lastIndexOf('/') + 1, o1U.lastIndexOf('.'));
      o2Index = o2U.substring(o2U.lastIndexOf('/') + 1, o2U.lastIndexOf('.'));
      return o1Index - o2Index;
    });
  }
  return arr;
}

async function getLatestChapter(urlx) {
  let res = await crawlPage(urlx);
  if (res === '-1') { return '-1'; }
  const host = url.parse(urlx).host;
  const cfg = conf.getX(host);
  if (cfg === '-1') return '暂不支持该网站';
  res = iconv.decode(res, cfg.charset)
  const $ = cheerio.load(res, { decodeEntities: false });
  let as = $(cfg.latestChapterSelector);
  return as.attr(cfg.latestChapterInfo);
}

async function getChapterDetail(urlx) {
  let res = await crawlPage(urlx);
  if (res === '-1') { return ''; }
  const host = url.parse(urlx).host;
  const cfg = conf.getX(host);
  if (cfg === '-1') return '暂不支持该网站';
  res = iconv.decode(res, cfg.charset);
  res = res.replace(/&nbsp;/g, '').replace(/<br \/>/g, '${line}').replace(/<br\/>/g, '${line}');
  const $ = cheerio.load(res, { decodeEntities: false });
  let asTit = $(cfg.chapterDetail.titleSelector);
  let asCon = $(cfg.chapterDetail.contentSelector);
  asCon = host.indexOf('kanshuz') !== -1 || host.indexOf('m.xs') !== -1 ? asCon[0].children[2].data : asCon.text();
  let arr = {
    title: asTit[0].children[0].data.split('_')[0],
    content: asCon.replace(/\${line}/g, '\n').replace(/[ 　]+/g, '').replace(/\n+/g, '\n')
  };
  return arr;
}

async function RnkList(x) {
  let urlx = `http://r.qidian.com/yuepiao?style=2&page=${x}`;
  let RankList = [];
  let res = await crawlPage(urlx);
  if (res === '-1') { return ''; }
  const host = url.parse(urlx).host;
  const cfg = conf.getX(host);
  if (cfg === '-1') return '暂不支持该网站';
  res = iconv.decode(res, cfg.charset);
  const $ = cheerio.load(res, { decodeEntities: false });
  const ass = $(cfg.novelRankSelector);
  let $2, asn;
  for (let i = 0, size = ass.length; i < size; i++) {
    $2 = cheerio.load(ass[i], { decodeEntities: false })
    asn = $2('td');
    if (asn.length < 2) continue;
    RankList.push({
      type: asn[1].children[0].children[1].data,
      name: asn[2].children[0].children[0].data,
      latestChapter: asn[3].children[0].children[0].data,
      author: asn[5].children[0].children[0].data,
    });
  }
  return RankList;
}

async function getLatestChapterLst(list) {
  let workQueue = [];
  for (let i = 0, j = list.length; i < j; i++) {
    workQueue.push(getLatestChapter(list[i].url));
  }
  let resLst = await Promise.all(workQueue);
  workQueue = [];
  let res = [];
  let markList = [];
  resLst.filter((item, index) => {
    if (item !== list[index].title) {
      workQueue.push(getChapterList(list[index].url));
      markList.push(index);
      res.push({
        title: item,
        list: []
      });
    } else {
      res.push('-1');
    }
  });
  if (workQueue.length !== 0) {
    resLst = await Promise.all(workQueue);
    let i = 0;
    resLst.filter((item, index) => {
      res[markList[i++]].list = item;
    });
  }

  return res;
}


exports.getChapterList = getChapterList;
exports.craw = craw;
exports.getChapterDetail = getChapterDetail;
exports.RnkList = RnkList;
exports.getLatestChapter = getLatestChapter;
exports.getLatestChapterLst = getLatestChapterLst;
