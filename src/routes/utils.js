const { craw } = require('../util/http-req');
const Router = require('koa-router');

const router = Router();

router.get('/get-image', async ctx => {
  const { img } = ctx.request.query;
  const data = await craw(img);
  ctx.status = 200;
  ctx.type = 'image/png';
  ctx.body = data;
});

module.exports = router;
