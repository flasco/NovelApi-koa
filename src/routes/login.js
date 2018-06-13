const Router = require('koa-router');
const AV = require('leanengine');
const router = Router();

router.post('/', async (ctx, next) => {
  let params = ctx.request.body;
  if (params != null && params.userName != null && params.password != null) {
    try {
      let loginedUser = await AV.User.logIn(params.userName, params.password);
      ctx.body = {
        success: 1,
        msg: 'welcome',
        token: loginedUser._sessionToken,
      };
    } catch (error) {
      ctx.body = {
        success: 0,
        msg: error.rawMessage,
      };
    }
  } else {
    ctx.body = {
      success: 0,
      msg: 'fail'
    };
  }
});

module.exports = router;