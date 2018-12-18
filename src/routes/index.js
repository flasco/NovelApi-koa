const Router = require('koa-router');

const home = require('./home');
const apidoc = require('./apidoc');
const search = require('./search');
const rnklist = require('./rnklist');
const analysis = require('./analysis');

const router = Router();

router.use('/', home.routes(), home.allowedMethods());
router.use('/apidoc', apidoc.routes(), apidoc.allowedMethods());

router.use('/v2/sear', search.routes(), search.allowedMethods());
router.use('/v2/rnklist', rnklist.routes(), rnklist.allowedMethods());
router.use('/v2/analysis', analysis.routes(), analysis.allowedMethods());

router.get('*', async (ctx) => {
  ctx.body = 'Request Error';
});

module.exports = router;