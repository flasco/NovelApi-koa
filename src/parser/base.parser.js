const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const get = require('lodash/get');
const NovelChaper = require('../class/NovelChapter');

const { crawlPage } = require('../util/http-req');
iconv.skipDecodeWarning = true;

class BaseParser {
  async getPageContent(url) {
    let res = await crawlPage(url);

    res = iconv.decode(res, this.charset);
    return res;
  }

  async getChapterList(url) {
    let res = await this.getPageContent(url);

    const $ = cheerio.load(res, { decodeEntities: false });
    const as = $(this.chapterListSelector);

    const novelList = [];
    const titleSet = new Set();
    for (let i = 0, j = as.length, k = 0; i < j; i++) {
      const title = as[i].children[0].data;
      if (!titleSet.has(title)) {
        novelList[k++] = new NovelChaper(title, url + as[i].attribs.href);
        titleSet.add(title);
      }
    }

    if (this.wheSort) {
      let o1U, o2U, o1Index, o2Index;
      novelList.sort(function(a, b) {
        o1U = a.url;
        o2U = b.url;
        o1Index = o1U.substring(o1U.lastIndexOf('/') + 1, o1U.lastIndexOf('.'));
        o2Index = o2U.substring(o2U.lastIndexOf('/') + 1, o2U.lastIndexOf('.'));
        return o1Index - o2Index;
      });
    }
    return novelList;
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
