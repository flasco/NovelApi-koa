const get = require('lodash/get');
const cheerio = require('cheerio');

const BaseParser = require('./base.parser');
const NovelChaper = require('../class/NovelChapter');

const CHAPTER_URL = 'https://www.kanshuzhong.com';

class KanshuzParser extends BaseParser {
  constructor() {
    super();

    this.key = ['kanshuzhong'];
    this.wheSort = true;
    this.charset = 'gbk';
    this.latestChapterInfo = 'content';
    this.url = 'https://www.kanshuzhong.com/';
    this.latestChapterSelector = `meta[property='og:novel:latest_chapter_name']`;
    this.chapterListSelector = '.mulu_list li a';
    this.chapterDetail = {
      titleSelector: '.h1title h1',
      contentSelector: '.contentbox',
      prevSelector: '#pager_prev',
      nextSelector: '#pager_next'
    };
  }

  async getChapterDetail(url) {
    let res = await this.getPageContent(url, 'utf-8');

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

  async getChapterList(url) {
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

module.exports = KanshuzParser;
