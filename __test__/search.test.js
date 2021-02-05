const { searchBook } = require('../src/core/novel');

describe('测试章节内容接口', () => {
  test('xs.la', async () => {
    const res = await searchBook('没钱上大学的我');
    console.log(res);
  }, 100000);
});


// (async () => {
//   const res = await searchBook('我欲封天', ['xinxs.la', 'soxs', 'bxwxorg']);
//   console.log(res);
// })()