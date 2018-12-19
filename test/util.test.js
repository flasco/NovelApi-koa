const { getLatestChapterLst } = require('../src/core/novel');

test('testLatestChapterList', async () => {
  let list = [{
    url: 'https://www.xs.la/87_87069/',
    title: '123',
  }, {
    url: 'http://www.biqu.cm/21_21590/',
    title: '番外·5 亲爹',
  }]
  let res = await getLatestChapterLst(list);
  expect(res.length).toBe(2);
  expect(res[0].title.length).toBeGreaterThan(1);
  expect(res[0].list).toBeInstanceOf(Array);
}, 1000000);
