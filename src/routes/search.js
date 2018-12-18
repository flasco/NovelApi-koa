const Router = require('koa-router');

const searchNovel = require('../core/search');

const router = Router();

// params: name - string
router.get('/', async (ctx) => {
    const word = ctx.request.query.name || '';
    const aut = ctx.request.query.aut || '';
    const result = searchNovel(word, aut);

    ctx.body = JSON.stringify(result);
});

module.exports = router;
