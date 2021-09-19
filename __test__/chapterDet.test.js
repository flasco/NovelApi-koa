const { getChapterDetail } = require('../src/core/novel');

describe('测试章节内容接口', () => {
  test('xs.la', async () => {
    const res = await getChapterDetail(
      'https://www.xinxs.la/58_58731/3492917.html'
    );
    expect(res).toBeInstanceOf(Object);
    expect(typeof res.content).toEqual('string');
    expect(res.content.length).toBeGreaterThan(10);
  }, 100000);

  test('bxwxorg', async () => {
    const res = await getChapterDetail(
      'https://www.bxwxorg.com/read/34/1677904.html'
    );
    expect(res).toBeInstanceOf(Object);
    expect(typeof res.content).toEqual('string');
    expect(res.content.length).toBeGreaterThan(10);
  }, 100000);

  test('soxs', async () => {
    const res = await getChapterDetail(
      'https://www.soxs.cc/WoYuFengTian/1666212.html'
    );
    expect(res).toBeInstanceOf(Object);
    expect(typeof res.content).toEqual('string');
    expect(res.content.length).toBeGreaterThan(10);
  }, 100000);

  test('wutuxs', async () => {
    const res = await getChapterDetail(
      'https://www.wutuxs.com/html/9/9944/8428628.html'
    );
    expect(res).toBeInstanceOf(Object);
    expect(typeof res.content).toEqual('string');
    expect(res.content.length).toBeGreaterThan(10);
  }, 100000);
});
