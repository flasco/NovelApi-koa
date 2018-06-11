const { getChapterDetail } = require('../src/util/core');

describe('测试章节内容接口', () => {
  test('幽冰', async () => {
    let res1 = await getChapterDetail('https://www.97ub.cc/51_51464/19456630.html');
    expect(res1).toBeInstanceOf(Object);
    expect(res1.content).not.toBe('');
  })

  test('xs.la', async () => {
    let res2 = await getChapterDetail('https://www.xs.la/58_58731/3492254.html');
    expect(res2).toBeInstanceOf(Object);
    expect(res2.content).not.toBe('');
  })

  test('m.xs.la', async () => {
    let res3 = await getChapterDetail('https://m.xs.la/58_58731/3492254.html');
    expect(res3).toBeInstanceOf(Object);
    expect(res3.content).not.toBe('');
  })

  test('x23us', async () => {
    let res4 = await getChapterDetail('https://www.x23us.com/html/70/70842/31118902.html');
    expect(res4).toBeInstanceOf(Object);
    expect(res4.content).not.toBe('');
  })

  test('kanshuzhong', async () => {
    let res5 = await getChapterDetail('http://www.kanshuzhong.com/book/117994/25801454.html');
    expect(res5).toBeInstanceOf(Object);
    expect(res5.content).not.toBe('');
  })

  test('biqu.cm', async () => {
    let res6 = await getChapterDetail('http://www.biqu.cm/0_852/300117.html');
    expect(res6).toBeInstanceOf(Object);
    expect(res6.content).not.toBe('');
  })
})