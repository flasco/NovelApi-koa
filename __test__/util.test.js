const { crawlPage } = require('../src/util/http-req');

test('testLatestChapterList', async () => {
  console.log(Date.now());
  const res = await crawlPage('https://google.com/asd', 2000);
  console.log(Date.now());
}, 1000000);
