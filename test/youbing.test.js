const youbingParser = require('../src/parser/youbing.parser');
const CommonParser = require('../src/parser/common.parser');

describe('测试幽冰接口', () => {
  test('测试类方法的继承是否有效', async () => {
    let Youbing = new youbingParser();
  })

  test('调试方法', async () => {
    let Youbing = new youbingParser();
    let res1 = await Youbing.getChapterDetail('https://www.97ub.cc/51_51464/19456629.html');
    let res2 = await Youbing.getLatestChapter('https://www.97ub.cc/51_51464');
    let res3 = await Youbing.getChapterList('https://www.97ub.cc/51_51464');
    expect(res1).toBeInstanceOf(Object);
    expect(res2).not.toBe('');
    expect(res3).toBeInstanceOf(Array);
  })
})