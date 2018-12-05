const { CommonParser, cheerio } = require('./common.parser');
function QksParser() {
  this.key = Symbol('qukanshu');
  this.wheSort = true;
  this.charset = 'gbk';
  this.latestChapterInfo = 'title';
  this.url = 'https://www.7kshu.com/';
  this.latestChapterSelector = `#aboutbook a`;
  this.chapterListSelector = '#chapterlist li a';
  this.chapterDetail = {
    titleSelector: '#main h1',
    contentSelector: '#content',
    prevSelector: '#previewpage',
    nextSelector: '#nextpage',
  };
}

QksParser.prototype = new CommonParser();

QksParser.prototype.getLatestChapter = async function (urlx) {
  let res = await this.getPageContent(urlx);
  if (res === '-1') { return '-1'; }
  const $ = cheerio.load(res, { decodeEntities: false });
  let as = $(this.latestChapterSelector);
  return as.text();
}

QksParser.prototype.getChapterDetail = async function (urlx) {
  let res = await this.getPageContent(urlx);
  if (res === '-1') { return '-1'; }
  res = res.replace(/&nbsp;/g, '').replace(/<br \/>/g, '${line}').replace(/<br\/>/g, '${line}');
  const $ = cheerio.load(res, { decodeEntities: false });
  let asTit = $(this.chapterDetail.titleSelector);
  let asCon = $(this.chapterDetail.contentSelector);
  asCon = asCon[0].children.filter(item => item.nodeType === 3).map(item => item.data).join('\n');
  let arr = {
    title: asTit[0].children[0].data.split('_')[0],
    content: asCon.replace(/\${line}/g, '\n').replace(/[ 　]+/g, '').replace(/\n+/g, '\n')
  };
  return arr;
}

module.exports = QksParser;