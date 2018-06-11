const { CommonParser, cheerio } = require('./common.parser');
function KanshuzParser() {
  this.key = Symbol('kanshuz');
  this.wheSort = false;
  this.charset = 'gbk';
  this.latestChapterInfo = 'content';
  this.url = 'http://www.kanshuzhong.com/';
  this.latestChapterSelector = `meta[property='og:novel:latest_chapter_name']`;
  this.chapterListSelector = '.bookcontent dd a';
  this.chapterDetail = {
    titleSelector: '.ctitle',
    contentSelector: '.textcontent',
    prevSelector: '.readlink a',
    nextSelector: '.readlink a,4',
  };
}

KanshuzParser.prototype = new CommonParser();

// XslaParser.prototype.getChapterList = function(url){ console.log(url); }

KanshuzParser.prototype.getChapterDetail = async function (urlx) {
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

module.exports = KanshuzParser;