let sites = [
  null,
  {
    title: '顶点文学',
    wheSort: false,
    charset: 'gbk',
    latestChapterInfo: 'content',
    url: 'https://www.x23us.com',
    latestChapterSelector: `meta[property='og:novel:latest_chapter_name']`,
    chapterListSelector: '.bdsub tbody td a',
    chapterDetail: {
      titleSelector: '#amain h1',
      contentSelector: '#contents',
      prevSelector: '#footlink a',
      nextSelector: '#footlink a,2',
    },
    novelList: {
      selector: '#content table tr',
      nextSelector: '.next',
      prevSelector: '.prev',
    }
  }, {
    title: '笔趣阁',
    wheSort: true,
    charset: 'UTF-8',
    latestChapterInfo: 'content',
    url: 'https://www.xs.la/',
    latestChapterSelector: `meta[property='og:novel:latest_chapter_name']`,
    chapterListSelector: '#list dd a',
    chapterDetail: {
      titleSelector: '.bookname h1',
      contentSelector: '#content',
      prevSelector: '#pager_prev',
      nextSelector: '#pager_next',
    },
  }, {
    title: '看书中',
    wheSort: false,
    charset: 'gbk',
    url: 'http://www.kanshuzhong.com/',
    latestChapterInfo: 'content',
    latestChapterSelector: `meta[property='og:novel:latest_chapter_name']`,
    chapterListSelector: '.bookcontent dd a',
    chapterDetail: {
      titleSelector: '.ctitle',
      contentSelector: '.textcontent',
      prevSelector: '.readlink a',
      nextSelector: '.readlink a,4',
    }
  }, {
    title: '起点',
    wheSort: false,
    charset: 'UTF-8',
    url: 'http://read.qidian.com',
    latestChapterSelector: `.update .detail .cf a`,
    latestChapterInfo: 'title',
    chapterListSelector: '.volume-wrap .volume li a',
    novelRankSelector: '.book-text tbody tr'
  }, {
    title: '笔趣',
    wheSort: false,
    charset: 'gbk',
    url: 'http://www.biqu.cm/',
    chapterListSelector: '#list dd a',
    latestChapterInfo: 'content',
    latestChapterSelector: `meta[property='og:novel:latest_chapter_name']`,
    chapterDetail: {
      titleSelector: '.bookname h1',
      contentSelector: '#content',
      prevSelector: '#pager_prev',
      nextSelector: '#pager_next',
    },
  }, {
    title: '移动笔趣阁',
    wheSort: false,
    charset: 'UTF-8',
    latestChapterInfo: 'content',
    url: 'https://m.xs.la/',
    latestChapterSelector: `meta[property='og:novel:latest_chapter_name']`,
    chapterListSelector: '#chapterlist p a',
    chapterDetail: {
      titleSelector: 'title',
      contentSelector: '#chaptercontent',
      prevSelector: '#pb_prev',
      nextSelector: '#pb_next',
    },
  }, {
    title: '幽冰中文',
    wheSort: true,
    charset: 'gbk',
    latestChapterInfo: 'content',
    url: 'https://www.97ub.cc/',
    latestChapterSelector: `meta[property='og:novel:latest_chapter_name']`,
    chapterListSelector: '#list dd a',
    chapterDetail: {
      titleSelector: '.bookname h1',
      contentSelector: '#content',
      prevSelector: '#pager_prev',
      nextSelector: '#pager_next',
    },
  },];


function getXMLConf() {
  let site_ = {};
  site_.getX = (host) => {
    let index = ((`${host}`).indexOf('23us') > -1) && 1
      || ((`${host}`).indexOf('www.xs.la') > -1) && 2
      || ((`${host}`).indexOf('kanshuzhong') > -1) && 3
      || ((`${host}`).indexOf('qidian') > -1) && 4
      || ((`${host}`).indexOf('biqu.cm') > -1) && 5
      || ((`${host}`).indexOf('m.xs.la') > -1) && 6
      || ((`${host}`).indexOf('97ub.cc') > -1) && 7
      || -1;
    if (index === -1) {
      return '-1';
    } else {
      return sites[index];
    }
  }
  return site_;
}

module.exports = getXMLConf();
