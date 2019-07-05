const Router = require('koa-router');
const { qdGGRnkList, qdMMRnkLst } = require('../core/ranklist');
const router = Router();

const qdRankFunc = [qdGGRnkList, qdMMRnkLst];

// params: p - Number, gender - 0: male, 1: female
router.get('/', async (ctx) => {
  const { p = 1, gender = 0 } = ctx.request.query;

  const qdRnkList = qdRankFunc[gender] || qdGGRnkList;
  const result = await qdRnkList(p);
  
  ctx.json(0, 'ok', result)
});

module.exports = router;