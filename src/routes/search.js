const Router = require('koa-router');

const searchNovel = require('../core/search');

const router = Router();

// params: name - string
router.get('/', async ctx => {
  const { name = '', aut = '' } = ctx.request.query;

  const result = await searchNovel(name, aut);
  ctx.json(0, 'ok', result);
});

module.exports = router;
