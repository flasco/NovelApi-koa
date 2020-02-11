const Router = require('koa-router');

const home = require('./home');
const apidoc = require('./apidoc');
const search = require('./search');
const newSearch = require('./new-search');
const rnklist = require('./rnklist');
const analysis = require('./analysis');
const siteMap = require('./site-map');
const utils = require('./utils');

const router = Router();

router.use('/', home.routes(), home.allowedMethods());
router.use('/apidoc', apidoc.routes(), apidoc.allowedMethods());

router.use('/v2/sear', search.routes(), search.allowedMethods());
router.use('/v2/new-search', newSearch.routes(), newSearch.allowedMethods());
router.use('/v2/rnklist', rnklist.routes(), rnklist.allowedMethods());
router.use('/v2/analysis', analysis.routes(), analysis.allowedMethods());
router.use('/v2/site-map', siteMap.routes(), siteMap.allowedMethods());
router.use('/v2/utils', utils.routes(), utils.allowedMethods());

router.get('*', async (ctx) => {
  ctx.json(100000, 'invaild routes');
});

module.exports = router;