const { CommonParser, cheerio } = require('./common.parser');
const NovelChaper = require('./NovelChapter');
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

YoubingParser.prototype.getChapterList = async function (urlx) {
  let res = await this.getPageContent(urlx);
  if (res === '-1') { return '-1'; }
  const $ = cheerio.load(res, { decodeEntities: false });
  let as = $(this.chapterListSelector);
  let arr = [], tit = new Set(), i = 0, j = 0, tex = null;
  while (i < as.length) {
    tex = as[i].children[0].data;
    if (!tit.has(tex)) {
      arr[j++] = new NovelChaper(tex, `https:${as[i].attribs.href}`);
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

YoubingParser.prototype.getChapterDetail = async function (urlx) {
  let res = await this.getPageContent.call(this, urlx);
  if (res === '-1') { return '-1'; }
  const $ = cheerio.load(res, { decodeEntities: false });
  let asTit = $(this.chapterDetail.titleSelector);
  let asCon = $(this.chapterDetail.contentSelector);

  asCon = asCon[0].childNodes.map((item, index) => {
    if (item.childNodes != null) {
      return item.childNodes[0].data.trim();
    } else return '';
  });
  asCon = asCon.join('\n');
  let arr = {
    title: asTit[0].children[0].data.split('_')[0],
    content: asCon
  };
  return arr;
}

module.exports = YoubingParser;