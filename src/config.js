let sites = [
  {
    title: '笔趣阁',
    wheSort: true,
    charset: 'UTF-8',
    latestChapterInfo: 'content',
    url: 'https://www.xinxs.la/',
    latestChapterSelector: `meta[property='og:novel:latest_chapter_name']`,
    chapterListSelector: '#list dd a',
    chapterDetail: {
      titleSelector: '.bookname h1',
      contentSelector: '#content',
      prevSelector: '#pager_prev',
      nextSelector: '#pager_next'
    }
  },
  {
    title: '起点',
    wheSort: false,
    charset: 'UTF-8',
    url: 'http://read.qidian.com',
    latestChapterSelector: `.update .detail .cf a`,
    latestChapterInfo: 'title',
    chapterListSelector: '.volume-wrap .volume li a',
    novelRankSelector: '.book-text tbody tr'
  },
  {
    title: '幽冰中文',
    wheSort: true,
    charset: 'gbk',
    latestChapterInfo: 'content',
    url: 'https://www.97ub.cc/',
    latestChapterSelector: `meta[property='og:novel:latest_chapter_name']`,
    chapterListSelector: '#list dd a',
    chapterDetail: {
      titleSelector: '.bookname h1',
      contentSelector: '#content'
    }
  }
];

