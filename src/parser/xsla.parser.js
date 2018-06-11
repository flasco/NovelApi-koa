const { CommonParser } = require('./common.parser');
function XslaParser() {
  this.key = Symbol('xs.la');
  this.wheSort = true;
  this.charset = 'UTF-8';
  this.latestChapterInfo = 'content';
  this.url = 'https://www.xs.la/';
  this.latestChapterSelector = `meta[property='og:novel:latest_chapter_name']`;
  this.chapterListSelector = '#list dd a';
  this.chapterDetail = {
    titleSelector: '.bookname h1',
    contentSelector: '#content',
    prevSelector: '#pager_prev',
    nextSelector: '#pager_next',
  };
}

XslaParser.prototype = new CommonParser();

// XslaParser.prototype.getChapterList = function(url){ console.log(url); }

module.exports = XslaParser;