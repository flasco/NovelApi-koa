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
  const { url, action } = ctx.request.query;

  const result = await funArr[action](url);
  ctx.json(result);
});

router.post('/', async (ctx) => {
  const params = ctx.request.body;

  const result = await getLatestChapterLst(params);
  ctx.json(result);
});

module.exports = router;
