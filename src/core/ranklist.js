const cheerio = require('cheerio');
const iconv = require('iconv-lite');

const { crawlPage } = require('../util/http-req');

async function qdRnkList(x) {
  let urlx = `http://r.qidian.com/yuepiao?style=2&page=${x}`;
  let RankList = [];
  let res = await crawlPage(urlx);

  res = iconv.decode(res, 'UTF-8');
  const $ = cheerio.load(res, { decodeEntities: false });
  const ass = $('.book-text tbody tr');
  let $2, asn;
  for (let i = 0, size = ass.length; i < size; i++) {
    $2 = cheerio.load(ass[i], { decodeEntities: false });
    asn = $2('td');
    if (asn.length < 2) continue;
    RankList.push({
      type: asn[1].children[0].children[1].data,
      name: asn[2].children[0].children[0].data,
      latestChapter: asn[3].children[0].children[0].data,
      author: asn[5].children[0].children[0].data
    });
  }
  return RankList;
}

exports.qdRnkList = qdRnkList;