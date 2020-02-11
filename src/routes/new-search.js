const Router = require('koa-router');

const { searchBook } = require('../core/novel');

const router = Router();

// params: name - string
router.post('/', async ctx => {
  const { keyword = '', sites = [] } = ctx.request.body;

  const result = await searchBook(keyword, sites);
  ctx.json(0, 'ok', result);
});

module.exports = router;
