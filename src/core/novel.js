const { parserFactory } = require('../parser');

async function getChapterList(urlx) {
  const parser = parserFactory(urlx);
  return await parser.getChapterList(urlx);
}

async function getLatestChapter(urlx) {
  const parser = parserFactory(urlx);
  return await parser.getLatestChapter(urlx);
}

async function getChapterDetail(urlx) {
  const parser = parserFactory(urlx);
  return await parser.getChapterDetail(urlx);
}

async function getLatestChapterLst(list) {
  let workQueue = [];
  for (let i = 0, j = list.length; i < j; i++) {
    workQueue.push(getLatestChapter(list[i].url).catch(e => {}));
  }
  let resLst = await Promise.all(workQueue);
  workQueue = [];
  const markList = [];
  const res = resLst.map((item, index) => {
    if (item !== list[index].title) {
      const originUrl = list[index].url;
      workQueue.push(getChapterList(originUrl));
      markList.push(index);
      return {
        title: item,
        list: []
      };
    } else {
      return '-1';
    }
  });
  if (workQueue.length !== 0) {
    resLst = await Promise.all(workQueue);
    let i = 0;
    resLst.forEach(item => {
      res[markList[i++]].list = item;
    });
  }

  return res;
}

exports.getChapterList = getChapterList;
exports.getLatestChapter = getLatestChapter;
exports.getChapterDetail = getChapterDetail;
exports.getLatestChapterLst = getLatestChapterLst;
