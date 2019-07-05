const BaseParser = require('./base.parser');

class BooktxtParser extends BaseParser {
  constructor() {
    super();

    this.key = ['booktxt.net'];
    this.wheSort = true;
    this.charset = 'gbk';
    this.latestChapterInfo = 'content';
    this.url = 'https://www.booktxt.net/';
    this.latestChapterSelector = `meta[property='og:novel:lastest_chapter_name']`;
    this.chapterListSelector = '#list dd a';
    this.chapterDetail = {
      titleSelector: '.bookname h1',
      contentSelector: '#content',
      prevSelector: '#pager_prev',
      nextSelector: '#pager_next',
    };
  }
}

module.exports = BooktxtParser;