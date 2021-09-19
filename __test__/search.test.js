const { searchBook } = require('../src/core/novel');

// describe('测试章节内容接口', () => {
//   test('xs.la', async () => {
//     const res = await searchBook('没钱上大学的我');
//     console.log(res);
//   }, 100000);
// });


(async () => {
  const res = await searchBook('时间线', ['wutuxs']);
  console.log(res);
})()