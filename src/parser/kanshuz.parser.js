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

KanshuzParser.prototype.getChapterDetail = async function (urlx) {
  let res = await this.getPageContent(urlx);
  if (res === '') { return ''; }
  res = res.replace(/&nbsp;/g, '').replace(/<br \/>/g, '${line}').replace(/<br\/>/g, '${line}');
  const $ = cheerio.load(res, { decodeEntities: false });
  let asTit = $(this.chapterDetail.titleSelector);
  let asCon = $(this.chapterDetail.contentSelector);
  asCon = asCon[0].children.filter(item => item.nodeType === 3).map(item => item.data);
  let arr = {
    title: asTit[0].children[0].data.split('_')[0],
    content: asCon.replace(/\${line}/g, '\n').replace(/[ 　]+/g, '').replace(/\n+/g, '\n')
  };
  return arr;
}

module.exports = KanshuzParser;