const Router = require('koa-router');
const { RnkList } = require('../util/HttpReq');
const router = Router();

// params: p - Number
router.get('/', async (ctx, next) => {
  let params = ctx.request.query;
  try {
  ctx.body = await RnkList(params.p);
  } catch (error) {
    ctx.body = 'Parameter Error';
  }
});

module.exports = router;