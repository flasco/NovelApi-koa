const Router = require('koa-router');
const AV = require('leanengine');
const router = Router();

// params: name - string
router.get('/', async (ctx, next) => {
  try {
    const word = ctx.request.query.name || '';
    const aut = ctx.request.query.aut || '';
    const query = new AV.SearchQuery('Novel');
    query.queryString(`name:"${word}" author:"${aut}"`);
    const data = await query.find();
    let name, author, resu = [], nameSet = [];
    for (let i = 0, k = 0, j = data.length; i < j; i++) {
      name = data[i].get('name');
      author = data[i].get('author');
      if (nameSet[`${name}${author}`] !== undefined) {
        resu[nameSet[`${name}${author}`]].source[data[i].get('plantFormId')] = data[i].get('url');
        if (data[i].get('plantFormId') !== 3) resu[nameSet[`${name}${author}`]].img = data[i].get('img');
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
    nameSet = null;
    ctx.body = JSON.stringify(resu);
  } catch (error) {
    console.log(error)
    ctx.body = 'Search Failed';
  }
});

module.exports = router;