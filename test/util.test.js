const { getLatestChapterLst, getLatestChapter } = require('../src/util/HttpReq');
const axios = require('axios');
test.skip('testLatestChapterList', async () => {
  let list = ['https://www.xs.la/34_34495','https://www.xs.la/34_34445'];
  let res = await getLatestChapterLst(list);
  console.log(res);
});

test.skip('testJSON', () => {
  let list = ['https://www.xs.la/34_34495','https://www.xs.la/34_34445'];
  
  console.log(JSON.stringify(list))
});