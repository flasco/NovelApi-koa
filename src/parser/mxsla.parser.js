const cheerio = require('cheerio');

const BaseParser = require('./base.parser');
const NovelChaper = require('../class/NovelChapter');


const CHAPTER_URL = 'https://m.xs.la';

class MXslaParser extends BaseParser {
  constructor() {
    super();

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

  getPageContent(url) {
    url = url.replace('xs.', 'xinxs.');
    return super.getPageContent(url);
  }

  async getChapterDetail(url) {
    let res = await this.getPageContent(url);

    const $ = cheerio.load(res, { decodeEntities: false });
    let asTit = $(this.chapterDetail.titleSelector);
    let asCon = $(this.chapterDetail.contentSelector);
    asCon = asCon[0].children.filter(item => item.nodeType === 3).map(item => item.data).join('\n');
    let arr = {
      title: asTit[0].children[0].data.split('_')[0],
      content: asCon
    };
    return arr;
  }

  async getChapterList(url) {
    if (!/all\.html\b/.test(url)) url = `${url}all.html`;
    let res = await this.getPageContent(url);

    const $ = cheerio.load(res, { decodeEntities: false });
    let as = $(this.chapterListSelector);

    const chapterList = [];
    const titleSet = new Set();
    for (let i = 0, j = as.length, k = 0; i < j; i++) {
      const title = as[i].children[0].data;
      const chapterUrl = as[i].attribs.href;

      if (!titleSet.has(title) && /.html$/g.test(chapterUrl)) {
        chapterList[k++] = new NovelChaper(title, CHAPTER_URL + chapterUrl);
        titleSet.add(title);
      }
    }
    return chapterList;
  }
}

module.exports = MXslaParser;