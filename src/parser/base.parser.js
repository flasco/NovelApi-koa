const assert = require('assert');
const iconv = require('iconv-lite');
const URL = require('url');
const urlencode = require('urlencode');

const FetchException = require('../exceptions/FetchException');

const { crawlPage, postCrawl } = require('../util/http-req');
const htmlAnalysis = require('../util/quert');
iconv.skipDecodeWarning = true;

class BaseParser {
  constructor(config) {
    this.config = config;
    this.checkConfig(this.config.site);
    this.checkConfig(this.config.charset);
    this.checkConfig(this.config.detail.latest);
    this.checkConfig(this.config.list);
    this.checkConfig(this.config.detail);
    this.checkConfig(this.config.chapter);
  }

  checkConfig(value) {
    assert.ok(value, new FetchException(1000, 'config配置错误'));
  }

  async getPageContent(url, timeout = 5000) {
    const res = await crawlPage(url, timeout);
    return iconv.decode(res, this.config.charset);
  }

  async getPostContent(url, timeout = 5000) {
    const [newUrl, qstring] = url.split('?');
    const res = await postCrawl(newUrl, qstring, timeout);
    return iconv.decode(res, this.config.charset);
  }

  async getChapterList(url) {
    let res = await this.getPageContent(url, 6000);
    const { list } = this.config;

    const chapters = htmlAnalysis(res, list.chapters);

    const novelList = [];
    const hrefSet = new Set();
    for (let i = chapters.length - 1; i >= 0; i--) {
      const item = chapters[i];
      const title = htmlAnalysis(item, list.title);
      const href = htmlAnalysis(item, list.href);
      if (title.length < 1 || href == null) continue;
      if (!hrefSet.has(href)) {
        novelList.push({
          title,
          url: URL.resolve(url, href).replace(/(.*)(\/.*\/){2}(.*)/, '$1$2$3'),
        });
        hrefSet.add(href);
      }
    }

    hrefSet.clear();
    return novelList.reverse();
  }

  async getLatestChapter(url) {
    const res = await this.getPageContent(url, 4000);
    return htmlAnalysis(res, this.config.detail.latest);
  }

  async getChapterDetail(url) {
    let res = await this.getPageContent(url);

    res = res
      .replace(/&nbsp;/g, '')
      .replace(/<br>/g, '${line}')
      .replace(/<br \/>/g, '${line}')
      .replace(/<br\/>/g, '${line}');

    const { chapter } = this.config;
    const base = htmlAnalysis(res);
    const asContent = htmlAnalysis(base, chapter.content);

    const text = asContent
      .replace(/\${line}/g, '\n')
      .replace(/[ ]+/g, '')
      .replace(/[　]+/g, '')
      .replace(/\n+/g, '\n')
      .replace(/\t+/g, '');

    if (text.trim().length < 5) throw new Error('章节异常');

    const ret = {
      title: htmlAnalysis(base, chapter.title),
      content: text,
    };

    return ret;
  }

  get canSearch() {
    return this.config.search != null;
  }

  async search(keyword) {
    const { search, charset } = this.config;
    const { pattern, method, closeEncode } = search;

    const searchUrl = pattern.replace(
      '${key}',
      urlencode.encode(keyword, closeEncode ? 'utf-8' : charset)
    );

    let res;
    if (method === 'post') {
      res = await this.getPostContent(searchUrl, 8000);
    } else {
      res = await this.getPageContent(searchUrl, 8000);
    }
    const searchList = [];
    const list = htmlAnalysis(res, search.bookList);
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const name = htmlAnalysis(item, search.bookName);
      const author = htmlAnalysis(item, search.author);
      const href = htmlAnalysis(item, search.bookUrl);
      if (href == null || name.length < 1) continue;
      const payload = {
        name,
        url: URL.resolve(searchUrl, href),
        author,
      };
      if (search.latestChapter !== '') {
        payload.latestChapter = htmlAnalysis(item, search.latestChapter);
      }
      searchList.push(payload);
    }
    return searchList;
  }

  async getDetail(url) {
    const { latest, description, imageUrl, catalogUrl, author, name } = this.config.detail;
    const res = await this.getPageContent(url);

    const base = htmlAnalysis(res);

    const payload = {
      latest: htmlAnalysis(base, latest),
      desc: htmlAnalysis(base, description).trim(),
      name: htmlAnalysis(base, name),
      author: htmlAnalysis(base, author),
      image: URL.resolve(this.config.site, htmlAnalysis(base, imageUrl)),
      catalogUrl: url,
    };

    if (catalogUrl != null && catalogUrl !== '') {
      payload.catalogUrl = URL.resolve(this.config.site, htmlAnalysis(base, catalogUrl));
    }

    return payload;
  }
}

module.exports = BaseParser;
