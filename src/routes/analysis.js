const Router = require('koa-router');

const {
  getChapterDetail,
  getChapterList,
  getLatestChapter,
  getLatestChapterLst,
  getBookInfo,
  getOriginChapters,
} = require('../core/novel');

const router = Router();

const funArr = [undefined, getChapterList, getChapterDetail, getLatestChapter];

// params: action - Number url - url
router.get('/', async ctx => {
  const { url, action } = ctx.request.query;

  const func = funArr[action];
  if (func != null) {
    const result = await func(url);
    ctx.json(0, 'ok', result);
  } else {
    ctx.json(10000, 'invaild action');
  }
});

router.get('/info', async ctx => {
  const { url } = ctx.request.query;

  const result = await getBookInfo(url);
  ctx.json(0, 'ok', result);
});

router.post('/infos', async ctx => {
  const { sources = [] } = ctx.request.body;

  const stamp = Date.now();
  const workArr = sources.map((url, index) =>
    getBookInfo(url)
      .then(info => {
        info.plantformId = index;
        info.stamp = Date.now() - stamp;
        return info;
      })
      .catch(() => null)
  );
  const results = await Promise.all(workArr);

  ctx.json(
    0,
    'ok',
    results.filter(i => !!i).sort((a, b) => a.stamp - b.stamp)
  );
});

router.post('/', async ctx => {
  const params = ctx.request.body;

  const result = await getLatestChapterLst(params);
  ctx.json(0, 'ok', result);
});

router.post('/origin', async ctx => {
  const { list = [] } = ctx.request.body;

  const result = await getOriginChapters(list);
  ctx.json(0, 'ok', result);
});

module.exports = router;
