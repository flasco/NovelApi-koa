const { getLatestChapter } = require('../src/core/novel');

describe('测试章节列表接口', () => {
  test('xs.la', async () => {
    const res = await getLatestChapter('https://www.xinxs.la/87_87069/');
    expect(res).not.toBe('');
    expect(res).not.toBeUndefined();
  }, 100000)

  test('bxwxorg', async () => {
    const res = await getLatestChapter('https://www.bxwxorg.com/read/34/');
    expect(res).not.toBe('');
    expect(res).not.toBeUndefined();
  }, 100000)

  test('soxs', async () => {
    const res = await getLatestChapter('https://www.soxs.cc/WoYuFengTian/');
    expect(res).not.toBe('');
    expect(res).not.toBeUndefined();
  }, 100000)

  test('wutuxs', async () => {
    const res = await getLatestChapter('http://www.wutuxs.com/html/9/9944/');
    expect(res).not.toBe('');
    expect(res).not.toBeUndefined();
  }, 100000)
})
