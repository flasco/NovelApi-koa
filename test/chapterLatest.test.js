const { getLatestChapter } = require('../src/util/core');

describe('测试章节列表接口', () => {
  test('幽冰', async () => {
    let res = await getLatestChapter('https://www.97ub.cc/51_51464');
    expect(res).not.toBe('');
  })

  test('xs.la', async () => {
    let res = await getLatestChapter('https://www.xs.la/58_58731');
    expect(res).not.toBe('');
  })

  test('m.xs.la', async () => {
    let res = await getLatestChapter('https://m.xs.la/58_58731');
    expect(res).not.toBe('');
  })

  test('x23us', async () => {
    let res = await getLatestChapter('https://www.x23us.com/html/70/70842/');
    expect(res).not.toBe('');
  })

  test('kanshuzhong', async () => {
    let res = await getLatestChapter('http://www.kanshuzhong.com/book/117994');
    expect(res).not.toBe('');
  })

  test('biqu.cm', async () => {
    let res = await getLatestChapter('http://www.biqu.cm/0_852');
    expect(res).not.toBe('');
  })
})