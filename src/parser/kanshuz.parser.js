const BaseParser = require('./base.parser');
const get = require('lodash/get');
const cheerio = require('cheerio');

class KanshuzParser extends BaseParser {
  constructor() {
    super();

    this.key = ['kanshuzhong'];
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
      nextSelector: '.readlink a,4'
    };
  }

  async getChapterDetail(url) {
    let res = await this.getPageContent(url);

    res = res
      .replace(/&nbsp;/g, '')
      .replace(/<br \/>/g, '${line}')
      .replace(/<br\/>/g, '${line}');

    const $ = cheerio.load(res, { decodeEntities: false });
    let asTit = $(this.chapterDetail.titleSelector);
    let asCon = $(this.chapterDetail.contentSelector);
    asCon = asCon[0].children
      .filter(item => item.nodeType === 3)
      .map(item => item.data)
      .join('\n');
    let arr = {
      title: get(asTit, '[0].children[0].data', '').split('_')[0],
      content: asCon
        .replace(/\${line}/g, '\n')
        .replace(/[ 　]+/g, '')
        .replace(/\n+/g, '\n')
    };
    return arr;
  }
}

module.exports = KanshuzParser;
