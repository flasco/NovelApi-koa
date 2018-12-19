const { getLatestChapter } = require('../src/core/novel');

describe('测试章节列表接口', () => {
  test('xs.la', async () => {
    let res = await getLatestChapter('https://www.xs.la/87_87069/');
    expect(res).not.toBe('');
  }, 100000)

  test('m.xs.la', async () => {
    let res = await getLatestChapter('https://m.xs.la/87_87069/');
    expect(res).not.toBe('');
  }, 100000)

  test('x23us', async () => {
    let res = await getLatestChapter('https://www.x23us.com/html/70/70842/');
    expect(res).not.toBe('');
  }, 100000)

  test('kanshuzhong', async () => {
    let res = await getLatestChapter('http://www.kanshuzhong.com/book/123981/');
    expect(res).not.toBe('');
  }, 100000)

  test('biqu.cm', async () => {
    let res = await getLatestChapter('http://www.biqu.cm/0_852');
    expect(res).not.toBe('');
  }, 100000)
})