const Router = require('koa-router');
const { qdRnkList } = require('../core/ranklist');
const router = Router();

// params: p - Number
router.get('/', async (ctx) => {
  let params = ctx.request.query;
  ctx.body = await qdRnkList(params.p);
});

module.exports = router;