const BaseParser = require('./base.parser');

class X23usParser extends BaseParser {
  constructor() {
    super();

    this.key = Symbol('x23us');
    this.wheSort = true;
    this.charset = 'gbk';
    this.latestChapterInfo = 'content';
    this.url = 'https://www.x23us.com';
    this.latestChapterSelector = `meta[property='og:novel:latest_chapter_name']`;
    this.chapterListSelector = '.bdsub tbody td a';
    this.chapterDetail = {
      titleSelector: '.bdsub h1',
      contentSelector: '#contents',
      prevSelector: '#footlink a',
      nextSelector: '#footlink a,2',
    };
    this.novelList = {
      selector: '#content table tr',
      nextSelector: '.next',
      prevSelector: '.prev',
    };
  }
}

module.exports = X23usParser;