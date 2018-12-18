const Router = require('koa-router');
const { qdRnkList } = require('../core/ranklist');
const router = Router();

// params: p - Number
router.get('/', async (ctx) => {
  const { p = 1 } = ctx.request.query;
  ctx.body = await qdRnkList(p);
});

module.exports = router;