const { getChapterList } = require('../src/core/novel');

describe('测试章节列表接口', () => {
  test('xs.la', async () => {
    const res = await getChapterList('https://www.xinxs.la/58_58731/');
    expect(res).toBeInstanceOf(Array);
    expect(res.length).toBeGreaterThan(0);
  }, 100000);

  test('bxwxorg', async () => {
    const res = await getChapterList('https://www.bxwxorg.com/read/34/');
    expect(res).toBeInstanceOf(Array);
    expect(res.length).toBeGreaterThan(0);
  }, 100000);

  test('soxs', async () => {
    const res = await getChapterList('https://www.soxs.cc/WoYuFengTian/');
    expect(res).toBeInstanceOf(Array);
    expect(res.length).toBeGreaterThan(0);
  }, 100000);
});
