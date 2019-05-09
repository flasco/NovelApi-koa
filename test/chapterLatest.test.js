const { getLatestChapter } = require('../src/core/novel');

describe('测试章节列表接口', () => {
  test('booktxt.net', async () => {
    const res = await getLatestChapter('https://www.booktxt.net/2_2219/');
    expect(res).not.toBe('');
    expect(res).not.toBeUndefined();
  }, 100000)

  test('xs.la', async () => {
    const res = await getLatestChapter('https://www.xinxs.la/87_87069/');
    expect(res).not.toBe('');
    expect(res).not.toBeUndefined();
  }, 100000)

  test('m.xs.la', async () => {
    const res = await getLatestChapter('https://m.xinxs.la/87_87069/');
    expect(res).not.toBe('');
    expect(res).not.toBeUndefined();
  }, 100000)

  test('x23us', async () => {
    const res = await getLatestChapter('https://www.x23us.com/html/73/73277/');
    expect(res).not.toBe('');
    expect(res).not.toBeUndefined();
  }, 100000)

  test('kanshuzhong', async () => {
    const res = await getLatestChapter('http://www.kanshuzhong.com/book/123981/');
    expect(res).not.toBe('');
    expect(res).not.toBeUndefined();
  }, 100000)

  test('biqu.cm', async () => {
    const res = await getLatestChapter('http://www.biqu.cm/0_852');
    expect(res).not.toBe('');
    expect(res).not.toBeUndefined();
  }, 100000)
})