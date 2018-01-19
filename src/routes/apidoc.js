const Router = require('koa-router');
const render = require('koa-ejs');

const router = Router();

router.get('/', async (ctx, next) => {
  await ctx.render('api');
});

module.exports = router;