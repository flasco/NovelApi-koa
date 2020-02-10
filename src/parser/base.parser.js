const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const get = require('lodash/get');
const NovelChaper = require('../class/NovelChapter');

const FetchException = require('../exceptions/FetchException');

const { crawlPage } = require('../util/http-req');
iconv.skipDecodeWarning = true;

class BaseParser {
  async getPageContent(url, charset = this.charset) {
    let res = await crawlPage(url);

    res = iconv.decode(res, charset);
    return res;
  }

  async getChapterList(url) {
    let res = await this.getPageContent(url);

    const $ = cheerio.load(res, { decodeEntities: false });
    const as = $(this.chapterListSelector);

    const novelList = [];
    const hrefSet = new Set();
    for (let i = as.length - 1,k = 0; i >= 0; i--) {
      const title = as[i].children[0].data;
      const href = as[i].attribs.href;
      if (!hrefSet.has(title)) {
        novelList.push(new NovelChaper(title, url + href));
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
    const asTitle = $(this.chapterDetail.titleSelector);
    const asContent = $(this.chapterDetail.contentSelector).text();

    if (asContent.includes('正在手打中')) throw new FetchException(10001, '正在手打中..');

    const title = get(asTitle, '[0].children[0].data', '');
    const chapter = {
      title: title.split('_')[0],
      content: asContent
        .replace(/\${line}/g, '\n')
        .replace(/[ 　]+/g, '')
        .replace(/\n+/g, '\n')
    };
    return chapter;
  }
}

module.exports = BaseParser;
exports.NovelChaper = NovelChaper;
