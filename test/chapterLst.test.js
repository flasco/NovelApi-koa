const { getChapterList } = require('../src/util/core');

describe('测试章节列表接口', () => {
  test('幽冰', async () => {
    let res = await getChapterList('https://www.97ub.cc/51_51464');
    expect(res).toBeInstanceOf(Array);
    expect(res.length).not.toBe(0);
  })

  test('xs.la', async () => {
    let res = await getChapterList('https://www.xs.la/58_58731');
    expect(res).toBeInstanceOf(Array);
    expect(res.length).not.toBe(0);
  })

  test('m.xs.la', async () => {
    let res = await getChapterList('https://m.xs.la/58_58731');
    expect(res).toBeInstanceOf(Array);
    expect(res.length).not.toBe(0);
  })

  test('x23us', async () => {
    let res = await getChapterList('https://www.x23us.com/html/70/70842/');
    expect(res).toBeInstanceOf(Array);
    expect(res.length).not.toBe(0);
  })

  test('kanshuzhong', async () => {
    let res = await getChapterList('http://www.kanshuzhong.com/book/117994');
    expect(res).toBeInstanceOf(Array);
    expect(res.length).not.toBe(0);
  })

  test('biqu.cm', async () => {
    let res = await getChapterList('http://www.biqu.cm/0_852');
    expect(res).toBeInstanceOf(Array);
    expect(res.length).not.toBe(0);
  })
})