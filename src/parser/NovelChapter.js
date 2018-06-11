function NovelChaper(title, url) {
  this.title = title;
  this.url = url.replace(/(.*)(\/.*\/){2}(.*)/, '$1$2$3');
}

module.exports = NovelChaper;