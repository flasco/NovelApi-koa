const Router = require('koa-router');
const home = require('./home');
const analysis = require('./analysis');
const rnklist = require('./rnklist');

const router = Router();

router.use('/', home.routes(), home.allowedMethods());
router.use('/rnklist', rnklist.routes(), rnklist.allowedMethods());
router.use('/analysis', analysis.routes(), analysis.allowedMethods());

router.get('*', async (ctx, next) => {
  ctx.body = 'Request Error';
});

module.exports = router;