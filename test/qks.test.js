const qksParser = require('../src/parser/qks.parser');

describe('测试qks接口', () => {
  test('调试方法', async () => {
    let Youbing = new qksParser();
    let res1 = await Youbing.getChapterDetail('https://www.7kshu.com/43/43281/13764184.html');
    let res2 = await Youbing.getLatestChapter('https://www.7kshu.com/43/43281/');
    let res3 = await Youbing.getChapterList('https://www.7kshu.com/43/43281/');
    expect(res1).toBeInstanceOf(Object);
    expect(res2).not.toBe(undefined);
    expect(res3).toBeInstanceOf(Array);
  })
})