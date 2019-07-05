const { getChapterDetail } = require('../src/core/novel');

describe('测试章节内容接口', () => {
  test('booktxt.net', async () => {
    let res = await getChapterDetail('https://www.booktxt.net/2_2219/1483259.html');
    expect(res).toBeInstanceOf(Object);
    expect(res.content).not.toBe('');
    expect(res.content).not.toBeUndefined();
  }, 100000)

  test('xs.la', async () => {
    let res = await getChapterDetail('https://www.xinxs.la/58_58731/3492917.html');
    expect(res).toBeInstanceOf(Object);
    expect(res.content).not.toBe('');
    expect(res.content).not.toBeUndefined();
  }, 100000)

  test('m.xs.la', async () => {
    let res = await getChapterDetail('https://m.xinxs.la/58_58731/3492917.html');
    expect(res).toBeInstanceOf(Object);
    expect(res.content).not.toBe('');
    expect(res.content).not.toBeUndefined();
  }, 100000)

  test('x23us', async () => {
    let res = await getChapterDetail('https://www.x23us.com/html/70/70842/31118902.html');
    expect(res).toBeInstanceOf(Object);
    expect(res.content).not.toBe('');
    expect(res.content).not.toBeUndefined();
  }, 100000)

  test('kanshuzhong', async () => {
    let res = await getChapterDetail('http://www.kanshuzhong.com/book/117994/25801454.html');
    expect(res).toBeInstanceOf(Object);
    expect(res.content).not.toBe('');
    expect(res.content).not.toBeUndefined();
  }, 100000)

  test('biqu.cm', async () => {
    let res = await getChapterDetail('http://www.biqu.cm/0_852/300117.html');
    expect(res).toBeInstanceOf(Object);
    expect(res.content).not.toBe('');
    expect(res.content).not.toBeUndefined();
    expect(res.content.length).toBeGreaterThan(5);
  }, 100000)
})