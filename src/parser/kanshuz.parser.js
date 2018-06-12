const { CommonParser, cheerio } = require('./common.parser');
function KanshuzParser() {
  this.key = Symbol('kanshuz');
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
    nextSelector: '.readlink a,4',
  };
}

KanshuzParser.prototype = new CommonParser();

// XslaParser.prototype.getChapterList = function(url){ console.log(url); }

module.exports = KanshuzParser;