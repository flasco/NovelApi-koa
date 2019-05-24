const Router = require('koa-router');
const { getRank } = require('../core/source-rank');
const router = Router();

router.get('/', async ctx => {
  const result = getRank();

  ctx.json(0, 'ok', result);
});

module.exports = router;
