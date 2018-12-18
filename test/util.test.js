const { getLatestChapterLst, getLatestChapter } = require('../src/util/HttpReq');

test('testLatestChapterList', async () => {
  let list = [{
    url: 'https://www.xs.la/87_87069/',
    title: '123',
  }, {
    url: 'http://www.biqu.cm/21_21590/',
    title: '1234',
  }]
  let res = await getLatestChapterLst(list);
  console.log(res);
});

test.skip('testJSON', () => {
  let list = ['https://www.xs.la/34_34495', 'https://www.xs.la/34_34445'];

  console.log(JSON.stringify(list))
});