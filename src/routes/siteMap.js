const Router = require('koa-router');
const router = Router();

router.get('/', async (ctx) => {

  const result = {
    1: 'xs.la',
    2: 'biqu.cm',
    3: 'booktxt.com',
  }
  
  ctx.json(0, 'ok', result)
});

module.exports = router;