const Router = require('koa-router');

const home = require('./home');
const apidoc = require('./apidoc');
const search = require('./search');
const rnklist = require('./rnklist');
const analysis = require('./analysis');

const router = Router();

router.use('/', home.routes(), home.allowedMethods());
router.use('/sear', search.routes(), search.allowedMethods());
router.use('/apidoc', apidoc.routes(), apidoc.allowedMethods());
router.use('/rnklist', rnklist.routes(), rnklist.allowedMethods());
router.use('/analysis', analysis.routes(), analysis.allowedMethods());

router.get('*', async (ctx, next) => {
  ctx.body = 'Request Error';
});

module.exports = router;