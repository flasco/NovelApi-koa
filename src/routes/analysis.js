const Router = require('koa-router');

const { getChapterDetail, getChapterList,
  getLatestChapter } = require('../util/HttpReq');

const router = Router();

const funArr = [undefined, getChapterList, getChapterDetail, getLatestChapter];

// params: action - Number url - url
router.get('/', async (ctx, next) => {
  let params = ctx.request.query;
  try {
    ctx.body = await funArr[params.action](params.url);
  } catch (error) {
    ctx.body = 'Action / url Error';
  }
});

module.exports = router;