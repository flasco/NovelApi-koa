const { parserFactory, getSearchParserFromSites } = require("../parser");

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

async function searchBook(keyword, sites) {
  const parsers = getSearchParserFromSites(sites);
  const workArr = parsers.map((parser) =>
    parser.search(keyword).catch((e) => [])
  );

  const resultArr = await Promise.all(workArr);
  const result = [];
  const nameMap = {};
  let ptr = 0;

  resultArr.forEach((items) => {
    items.forEach((item) => {
      const position = nameMap[`${item.name}${item.author}`];
      if (position == null) {
        nameMap[`${item.name}${item.author}`] = ptr;
        result[ptr++] = {
          bookName: item.name,
          author: item.author,
          plantformId: 0,
          source: [item.url],
        };
      } else {
        result[position].source.push(item.url);
      }
    });
  });

  return result;
}

async function getBookInfo(url) {
  const parser = parserFactory(url);
  return await parser.getDetail(url);
}

async function getLatestChapterLst(list) {
  const workQueue = list.map((item) =>
    getLatestChapter(item.url).catch(() => null)
  );

  let resLst = await Promise.all(workQueue);
  workQueue.length = 0;
  const markList = [];
  const res = resLst.map((item, index) => {
    const listItem = list[index];
    if (item !== listItem.title && item != null) {
      const originUrl = listItem.fullUrl || listItem.url;
      workQueue.push(getChapterList(originUrl).catch(() => null));
      markList.push(index);
      return {
        title: item,
        list: [],
      };
    } else {
      return "-1";
    }
  });
  if (workQueue.length !== 0) {
    resLst = await Promise.all(workQueue);
    let i = 0;
    resLst.forEach((item) => {
      if (item != null) {
        res[markList[i++]].list = item;
      } else {
        res[markList[i++]] = "-1";
      }
    });
  }

  return res;
}

async function getOriginChapters(list) {
  const workQueue = list.map((item) => getBookInfo(item).catch(() => null));
  const resLst = await Promise.all(workQueue);
  const result = resLst.filter(i => !!i).map((i, ind) => ({
    catalogUrl: i.catalogUrl,
    url: list[ind],
    latestChapter: i.latest || "获取失败",
  }));
  return result;
}

exports.searchBook = searchBook;
exports.getBookInfo = getBookInfo;
exports.getChapterList = getChapterList;
exports.getLatestChapter = getLatestChapter;
exports.getChapterDetail = getChapterDetail;
exports.getLatestChapterLst = getLatestChapterLst;
exports.getOriginChapters = getOriginChapters;
