const memCache = require("../../simple-cache/Cache");

const cccache = memCache.createCache("LRU", 10000);

function cache() {
  return async (ctx, next) => {
    let key = 'koa@' + ctx.request.originalUrl || ctx.request.url;
    let cachedBody = cccache.get(key);
    if (cachedBody) {
      ctx.body = cachedBody;
    } else {
      await next();
      cccache.set(key, ctx.body, 1000 * 60 * 60 * 4); //存放4小时
    }
  }
}

module.exports = cache;