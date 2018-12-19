const { getChapterList } = require('../src/core/novel');

describe('测试章节列表接口', () => {
  test('xs.la', async () => {
    let res = await getChapterList('https://www.xs.la/58_58731/');
    expect(res).toBeInstanceOf(Array);
    expect(res.length).not.toBe(0);
  }, 100000)

  test('m.xs.la', async () => {
    let res = await getChapterList('https://m.xs.la/58_58731/');
    expect(res).toBeInstanceOf(Array);
    expect(res.length).not.toBe(0);
  }, 100000)

  test('x23us', async () => {
    let res = await getChapterList('https://www.x23us.com/html/70/70842/');
    expect(res).toBeInstanceOf(Array);
    expect(res.length).not.toBe(0);
  }, 100000)

  test('kanshuzhong', async () => {
    let res = await getChapterList('http://www.kanshuzhong.com/book/117994');
    expect(res).toBeInstanceOf(Array);
    expect(res.length).not.toBe(0);
  }, 100000)

  test('biqu.cm', async () => {
    let res = await getChapterList('http://www.biqu.cm/0_852');
    expect(res).toBeInstanceOf(Array);
    expect(res.length).not.toBe(0);
  }, 100000)
})