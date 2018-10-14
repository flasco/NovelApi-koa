const url = require('url');
const iconv = require('iconv-lite');
const { crawlPage } = require('../util/HttpReq');
const cheerio = require('cheerio');
const NovelChaper = require('./NovelChapter');
iconv.skipDecodeWarning = true;

function CommonParser() {

}

CommonParser.prototype.getPageContent = async function (urlx) {
  let res = await crawlPage(urlx);
  if (res === '') { return ''; }
  res = iconv.decode(res, this.charset);
  return res;
}

CommonParser.prototype.getChapterList = async function (urlx) {
  let res = await this.getPageContent(urlx);
  if (res === '') { return ''; }
  const $ = cheerio.load(res, { decodeEntities: false });
  let as = $(this.chapterListSelector);
  let arr = [], tit = new Set(), i = 0, j = 0, tex = null;
  while (i < as.length) {
    tex = as[i].children[0].data;
    if (!tit.has(tex)) {
      arr[j++] = new NovelChaper(tex, urlx + as[i].attribs.href);
      tit.add(tex);
    }
    i++;
  }

  if (this.wheSort) {
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

CommonParser.prototype.getLatestChapter = async function (urlx) {
  let res = await this.getPageContent(urlx);
  if (res === '') { return ''; }
  const $ = cheerio.load(res, { decodeEntities: false });
  let as = $(this.latestChapterSelector);
  return as.attr(this.latestChapterInfo);
}

CommonParser.prototype.getChapterDetail = async function (urlx) {
  let res = await this.getPageContent(urlx);
  if (res === '') { return ''; }
  res = res.replace(/&nbsp;/g, '').replace(/<br \/>/g, '${line}').replace(/<br\/>/g, '${line}');
  const $ = cheerio.load(res, { decodeEntities: false });
  let asTit = $(this.chapterDetail.titleSelector);
  let asCon = $(this.chapterDetail.contentSelector);
  asCon = asCon.text();
  const children = asTit[0].children || [{ data: '' }];
  if (asTit[0].children == null) {
    console.error(res);
  }
  let arr = {
    title: children[0].data.split('_')[0],
    content: asCon.replace(/\${line}/g, '\n').replace(/[ 　]+/g, '').replace(/\n+/g, '\n')
  };
  return arr;
}

exports.CommonParser = CommonParser;
exports.cheerio = cheerio;