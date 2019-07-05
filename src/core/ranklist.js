const cheerio = require('cheerio');
const iconv = require('iconv-lite');

const { crawlPage } = require('../util/http-req');

async function qdMMRnkLst(x) {
  const url = `https://www.qidian.com/mm/rank/yuepiao?style=2&page=${x}`;
  const res = await crawlPage(url);
  
  return qdParser(res);
}

async function qdGGRnkList(x) {
  const url = `http://r.qidian.com/yuepiao?style=2&page=${x}`;
  const res = await crawlPage(url);
  return qdParser(res);
}

function qdParser(res) {
  const rankList = [];
  res = iconv.decode(res, 'UTF-8');
  const $ = cheerio.load(res, { decodeEntities: false });
  const ass = $('.book-text tbody tr');
  let $2, asn;
  for (let i = 0, size = ass.length; i < size; i++) {
    $2 = cheerio.load(ass[i], { decodeEntities: false });
    asn = $2('td');
    if (asn.length < 2) continue;
    rankList.push({
      type: asn[1].children[0].children[1].data,
      name: asn[2].children[0].children[0].data,
      latestChapter: asn[3].children[0].children[0].data,
      author: asn[5].children[0].children[0].data
    });
  }
  return rankList;
}

exports.qdGGRnkList = qdGGRnkList;
exports.qdMMRnkLst = qdMMRnkLst;