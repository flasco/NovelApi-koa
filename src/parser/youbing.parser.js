const { CommonParser, cheerio } = require('./common.parser');

function YoubingParser() {
  this.key = Symbol('97ub.cc');
  this.wheSort = true;
  this.charset = 'gbk';
  this.latestChapterInfo = 'content';
  this.url = 'https://www.97ub.cc/';
  this.latestChapterSelector = `meta[property='og:novel:latest_chapter_name']`;
  this.chapterListSelector = '#list dd a';
  this.chapterDetail = {
    titleSelector: '.bookname h1',
    contentSelector: '#content',
    prevSelector: '#pager_prev',
    nextSelector: '#pager_next',
  };
}

YoubingParser.prototype = new CommonParser();

YoubingParser.prototype.getChapterDetail = async function (urlx) {
  let res = await this.getPageContent.call(this, urlx);
  if (res === '-1') { return ''; }
  const $ = cheerio.load(res, { decodeEntities: false });
  let asTit = $(this.chapterDetail.titleSelector);
  let asCon = $(this.chapterDetail.contentSelector);

  asCon = asCon[0].childNodes.map((item, index) => {
    if (item.childNodes != null) {
      return item.childNodes[0].data.trim();
    } else return '';
  });
  asCon = asCon.join('/n');
  let arr = {
    title: asTit[0].children[0].data.split('_')[0],
    content: asCon
  };
  return arr;
}

module.exports = YoubingParser;