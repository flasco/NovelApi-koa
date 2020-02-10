const assert = require('assert');
const iconv = require('iconv-lite');
const URL = require('url');
const cheerio = require('cheerio');
const NovelChaper = require('../class/NovelChapter');

const FetchException = require('../exceptions/FetchException');

const { crawlPage } = require('../util/http-req');
iconv.skipDecodeWarning = true;

// url 记录 spider， config外传，map记录已经初始化好的spider
// 书源先自己写，后面可以写个过滤

class BaseParser {
  constructor(config) {
    this.config = config;
    this.checkConfig(this.config.site);
    this.checkConfig(this.config.charset);
    this.checkConfig(this.config.latestChapter);
    this.checkConfig(this.config.chapterList);
    this.checkConfig(this.config.chapterTitle);
    this.checkConfig(this.config.chapterContent);
  }

  checkConfig(value) {
    assert.ok(value, new FetchException(1000, 'config配置错误'));
  }

  async getPageContent(url) {
    const res = await crawlPage(url);
    return iconv.decode(res, this.config.charset);
  }

  async getChapterList(url) {
    let res = await this.getPageContent(url);

    const $ = cheerio.load(res, { decodeEntities: false });
    const as = $(this.config.chapterList);

    const novelList = [];
    const hrefSet = new Set();
    for (let i = as.length - 1; i >= 0; i--) {
      const ele = as.eq(i);
      const title = ele.text();
      const href = ele.attr('href');
      if (!hrefSet.has(title)) {
        novelList.push(new NovelChaper(title, URL.resolve(url, href)));
        hrefSet.add(title);
      }
    }

    hrefSet.clear();
    return novelList.reverse();
  }

  async getLatestChapter(url) {
    let res = await this.getPageContent(url);

    const $ = cheerio.load(res, { decodeEntities: false });
    let as = $(this.latestChapterSelector);
    return as.attr(this.latestChapterInfo);
  }

  async getChapterDetail(url) {
    let res = await this.getPageContent(url);

    res = res
      .replace(/&nbsp;/g, '')
      .replace(/<br \/>/g, '${line}')
      .replace(/<br\/>/g, '${line}');

    const $ = cheerio.load(res, { decodeEntities: false });
    const { chapterTitle, chapterContent, chapterError } = this.config;
    const asTitle = $(chapterTitle)
      .text()
      .trim();
    const asContent = $(chapterContent).text();

    if (chapterError && asContent.includes(chapterError)) {
      throw new FetchException(10001, '正在手打中..');
    }

    const chapter = {
      title: asTitle,
      content: asContent
        .replace(/\${line}/g, '\n')
        .replace(/[ 　]+/g, '')
        .replace(/\n+/g, '\n')
        .replace(/\t+/g, '')
    };
    return chapter;
  }

  async search(keyword) {
    const searchUrl = this.config.search.replace('${key}', keyword);
    const res = await this.getPageContent(searchUrl);
    const $ = cheerio.load(res, { decodeEntities: false });
    const lines = $(this.config.searchLine);

    const searchList = [];
    for (let i = 0; i < as.length; i++) {
      const ele = lines.eq(i);
      const AName = ele.find(this.config.searchChapter);
      const title = AName.text();
      const href = AName.attr('href');

      const author = ele.find(this.config.searchAuthor).text();
      if (!hrefSet.has(title)) {
        searchList.push({
          name,
          url: href,
          author,
          desc: '',
          img: '',
        });
      }
    }

    return searchList;
  }
}

module.exports = BaseParser;
