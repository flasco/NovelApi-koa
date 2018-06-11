const { CommonParser, cheerio } = require('./common.parser');
const NovelChaper = require('./NovelChapter');
function MXslaParser() {
  this.key = Symbol('m.xs.la');
  this.wheSort = false;
  this.charset = 'UTF-8';
  this.latestChapterInfo = 'content';
  this.url = 'https://m.xs.la/';
  this.latestChapterSelector = `meta[property='og:novel:latest_chapter_name']`;
  this.chapterListSelector = '#chapterlist p a';
  this.chapterDetail = {
    titleSelector: 'title',
    contentSelector: '#chaptercontent',
    prevSelector: '#pb_prev',
    nextSelector: '#pb_next',
  };
}

MXslaParser.prototype = new CommonParser();

MXslaParser.prototype.getChapterList = async function (urlx) {
  let res = await this.getPageContent.call(this, urlx);
  const $ = cheerio.load(res, { decodeEntities: false });
  let as = $(this.chapterListSelector);
  let arr = [], tit = new Set(), i = 1, j = 0, title = null;
  urlx = `https://m.xs.la`;
  while (i < as.length) {
    title = as[i].children[0].data;
    if (!tit.has(title)) {
      arr[j++] = new NovelChaper(title, urlx + as[i].attribs.href);
      tit.add(title);
    }
    i++;
  }
  return arr;
}

MXslaParser.prototype.getChapterDetail = async function (urlx) {
  let res = await this.getPageContent.call(this, urlx);
  if (res === '-1') { return ''; }
  const $ = cheerio.load(res, { decodeEntities: false });
  let asTit = $(this.chapterDetail.titleSelector);
  let asCon = $(this.chapterDetail.contentSelector);
  asCon = asCon[0].children[2].data;
  let arr = {
    title: asTit[0].children[0].data.split('_')[0],
    content: asCon
  };
  return arr;
}

module.exports = MXslaParser;