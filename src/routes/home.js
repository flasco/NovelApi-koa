const render = require('koa-ejs');
const Router = require('koa-router');

const router = Router();

router.get('/', async (ctx, next) => {
  let currentTime = new Date().toDateString();
  await ctx.render('home', {
    currentTime,
  });
});

module.exports = router;