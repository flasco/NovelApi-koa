const Router = require('koa-router');
const AV = require('leanengine');
const router = Router();

const builder = new AV.SearchSortBuilder().descending('name', 'min');
// params: name - string
router.get('/', async (ctx, next) => {
  const word = ctx.request.query.name;
  try {
    let resu = [], nameSet = [];
    const query = new AV.SearchQuery('Novel');
    query.sortBy(builder);
    query.queryString(`"${word}"`);
    const data = await query.find();
    for (let i = 0, k = 0, j = data.length; i < j; i++) {
      let name = data[i].get('name');
      let author = data[i].get('author');
      if (nameSet[`${name}${author}`] !== undefined) {
        resu[nameSet[`${name}${author}`]].source[data[i].get('plantFormId')] = data[i].get('url');
        if(data[i].get('plantFormId') !== 3) resu[nameSet[`${name}${author}`]].img = data[i].get('img');
      } else {
        nameSet[`${name}${author}`] = k;
        resu[k] = {
          bookName: name,
          author: data[i].get('author'),
          desc: data[i].get('desc'),
          img: data[i].get('img'),
          plantformId: data[i].get('plantFormId'),
          source: {}
        }
        resu[k++].source[data[i].get('plantFormId')] = data[i].get('url');
      }
    }
    ctx.body = JSON.stringify(resu);
  } catch (error) {
    ctx.body = 'Search Failed';
  }
});

module.exports = router;