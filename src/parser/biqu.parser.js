const BaseParser = require('./base.parser');

class BiquParser extends BaseParser {
  constructor() {
    super();

    this.key = ['biqu.cm'];
    this.wheSort = false;
    this.charset = 'gbk';
    this.latestChapterInfo = 'content';
    this.url = 'http://www.biqu.cm';
    this.latestChapterSelector = `meta[property='og:novel:latest_chapter_name']`;
    this.chapterListSelector = '#list dd a';
    this.chapterDetail = {
      titleSelector: '.bookname h1',
      contentSelector: '#content',
      prevSelector: '#pager_prev',
      nextSelector: '#pager_next',
    };
  }
}

module.exports = BiquParser;