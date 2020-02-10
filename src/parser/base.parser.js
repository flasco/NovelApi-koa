const assert = require('assert');
const iconv = require('iconv-lite');
const URL = require('url');
const cheerio = require('cheerio');
const NovelChaper = require('../class/NovelChapter');

const FetchException = require('../exceptions/FetchException');

const { crawlPage, postCrawl } = require('../util/http-req');
iconv.skipDecodeWarning = true;

class BaseParser {
  constructor(config) {
    this.config = config;
    this.checkConfig(this.config.site);
    this.checkConfig(this.config.charset);
    this.checkConfig(this.config.detail.latest);
    this.checkConfig(this.config.chapterList);
    this.checkConfig(this.config.chapterTitle);
    this.checkConfig(this.config.chapterContent);
  }

  checkConfig(value) {
    assert.ok(value, new FetchException(1000, 'config配置错误'));
  }

  async getPageContent(url, timeout = 5000) {
    const res = await crawlPage(url, timeout);
    return iconv.decode(res, this.config.charset);
  }

  async getPostContent(url, payload, timeout = 5000) {
    const res = await postCrawl(url, payload, timeout);
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
    const res = await this.getPageContent(url);
    const $ = cheerio.load(res, { decodeEntities: false });

    return $(this.config.detail.latest).attr('content');
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

  get canSearch() {
    return this.config.search != null;
  }

  async search(keyword) {
    const { pattern, line, chapter, author, method } = this.config.search;

    const searchUrl = pattern.replace('${key}', keyword);

    let res;
    if (method === 'post') {
      const args = URL.parse(searchUrl, true);
      res = await this.getPostContent(searchUrl, args.query, 8000);
    } else {
      res = await this.getPageContent(searchUrl, 8000);
    }

    const $ = cheerio.load(res, { decodeEntities: false });

    const lines = $(line);

    const searchList = [];
    for (let i = 0; i < lines.length; i++) {
      const ele = lines.eq(i);
      const AName = ele.find(chapter);
      const title = AName.text().trim();
      if (title === '') continue;
      const href = AName.attr('href');

      const aut = ele.find(author).text();
      searchList.push({
        name: title,
        url: URL.resolve(searchUrl, href),
        author: aut,
      });
    }

    return searchList;
  }

  async getDetail(url) {
    const { latest, description, imageUrl, author, name } = this.config.detail;
    const res = await this.getPageContent(url);

    const $ = cheerio.load(res, { decodeEntities: false });

    return {
      latest: $(latest).attr('content'),
      desc: $(description).attr('content'),
      name: $(name).attr('content'),
      author: $(author).attr('content'),
      image: $(imageUrl).attr('content'),
    }
  }
}

module.exports = BaseParser;
