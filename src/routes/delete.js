const Router = require('koa-router');
const AV = require('leanengine');
const router = Router();

// params: name - string
router.get('/', async (ctx, next) => {
  let time = new Date('2018-06-16 6:27:02').getTime();
  ctx.body = time;
  AV.Query.doCloudQuery(`delete from Novel where createdAt > ${time}`).then(function (asa) {
    // 删除成功
    console.log(asa)
  }, function (error) {
    // 异常处理
  });
});

module.exports = router;