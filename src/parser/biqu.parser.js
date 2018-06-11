const { CommonParser } = require('./common.parser');
function KanshuzParser() {
  this.key = Symbol('biqu.cm');
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

KanshuzParser.prototype = new CommonParser();

// XslaParser.prototype.getChapterList = function(url){ console.log(url); }

module.exports = KanshuzParser;