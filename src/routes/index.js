const Router = require('koa-router');

const home = require('./home');
const apidoc = require('./apidoc');
const search = require('./search');
const rnklist = require('./rnklist');
const analysis = require('./analysis');
const login = require('./login');
const sign = require('./sign');

const router = Router();

router.use('/', home.routes(), home.allowedMethods());
router.use('/sear', search.routes(), search.allowedMethods());
router.use('/apidoc', apidoc.routes(), apidoc.allowedMethods());
router.use('/rnklist', rnklist.routes(), rnklist.allowedMethods());
router.use('/analysis', analysis.routes(), analysis.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/sign', sign.routes(), sign.allowedMethods());

router.get('*', async (ctx, next) => {
  ctx.body = 'Request Error';
});

module.exports = router;