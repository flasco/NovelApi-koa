const Router = require('koa-router');

const router = Router();

router.get('/', async (ctx) => {
  await ctx.render('api');
});

module.exports = router;