const AV = require('leanengine');

async function searchNovels(title, aut) {
  const query = new AV.SearchQuery('Novel');
  query.queryString(`name:"${title}" author:"${aut}"`);
  const data = await query.find();
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
