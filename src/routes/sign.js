const Router = require('koa-router');
const AV = require('leanengine');
const router = Router();

router.post('/', async (ctx, next) => {
  let params = ctx.request.body;
  let user = new AV.User();
  if (params != null) {
    if (params.userName != null && params.password != null) {
      user.setUsername(params.userName);
      user.setPassword(params.password);
      try {
        let loginedUser = await user.signUp();
        ctx.body = {
          success: 1,
          msg: 'welcome',
          token: loginedUser._sessionToken,
        };
      } catch (error) {
        ctx.body = {
          success: 0,
          msg: error.rawMessage
        };
      }
    } else {
      ctx.body = {
        success: 0,
        msg: 'Error'
      }
    }
  }


});

module.exports = router;