const AV = require('leanengine');

const curCls = ['xs_1', 'xs_2', 'xs_3', 'xs_4'];

async function getData(title, aut) {
  const sqr = `name:"${title}" author:"${aut}"`;
  const workArr = curCls.map(className => {
    const query = new AV.SearchQuery(className);
    query.queryString(sqr);
    return query.find();
  })
  const result = await Promise.all(workArr);
  const arr = [];
  result.forEach(items => arr.push(...items));
  return arr;
}

async function searchNovels(title, aut) {
  const data = await getData(title, aut);
  const resultArr = [];
  let nameSet = [];
  for (let i = 0, k = 0, j = data.length; i < j; i++) {
    const curData = data[i];
    const name = curData.get('name');
    const author = curData.get('author');
    const nameKey = `${name}${author}`;
    const mapKey = nameSet[nameKey];
    const plantFormId = curData.get('plantFormId');
    const novelUrl = curData.get('url');
    if (mapKey != null) {
      resultArr[mapKey].source[plantFormId] = novelUrl;
      if (plantFormId !== 3) resultArr[mapKey].img = curData.get('img');
    } else {
      nameSet[nameKey] = k;
      resultArr[k] = {
        bookName: name,
        author,
        desc: curData.get('desc'),
        img: curData.get('img'),
        plantformId: plantFormId,
        source: {}
      };
      resultArr[k++].source[plantFormId] = novelUrl;
    }
  }
  nameSet = null;
  return resultArr;
}

module.exports = searchNovels;
