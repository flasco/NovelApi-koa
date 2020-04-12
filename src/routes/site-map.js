const Router = require('koa-router');
const { getSiteMap } = require('../parser');

const router = Router();

const siteMap = getSiteMap();

router.get('/', async (ctx) => {
  ctx.json(0, 'ok', siteMap)
});

module.exports = router;