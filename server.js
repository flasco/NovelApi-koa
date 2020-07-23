const AV = require('leanengine');

AV.init({
  appId: process.env.LEANCLOUD_APP_ID || 'T51iKKGXz2t9OriABcYSeRac-MdYXbMMI',
  appKey: process.env.LEANCLOUD_APP_KEY || 'n57PqFRFsbwsSddDPO89Xpj5',
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || '9wfTPNEVmSjkzMICbztkEMc4',
});

if (process.env.LEANCLOUD_APP_ID) {
  if (!process.env.SELF_WEBSITE) throw new Error('self_website is undefined');
}

// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();

const app = require('./src');

// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
const PORT = parseInt(
  process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3001
);

app.listen(PORT, function (err) {
  console.log('Node app is running on port:', PORT);

  // 注册全局未捕获异常处理器
  process.on('uncaughtException', function (err) {
    console.error('Caught exception:', err.stack);
  });
  process.on('unhandledRejection', function (reason, p) {
    console.error(
      'Unhandled Rejection at: Promise ',
      p,
      ' reason: ',
      reason.stack
    );
  });
});
