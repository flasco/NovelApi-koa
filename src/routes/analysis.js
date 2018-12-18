const Router = require('koa-router');

const {
  getChapterDetail,
  getChapterList,
  getLatestChapter,
  getLatestChapterLst
} = require('../core/novel');

const router = Router();

const funArr = [undefined, getChapterList, getChapterDetail, getLatestChapter];

// params: action - Number url - url
router.get('/', async (ctx) => {
  const { url } = ctx.request.query;
  ctx.body = await funArr[params.action](url);
});

router.post('/', async (ctx) => {
  const params = ctx.request.body;
  ctx.body = await getLatestChapterLst(params);
});

module.exports = router;
