const memCache = require("../../simple-cache/Cache");

const cccache = memCache.createCache("LRU", 10000);

function cache() {
  return async (ctx, next) => {
    const partten = ctx.originalUrl;
    if (partten !== '/' && partten.indexOf('analysis') === -1 && partten.indexOf('login') === -1 && partten.indexOf('sign') === -1) {
      const key = 'koa@' + partten;
      const cachedBody = cccache.get(key);
      if (cachedBody) {
        ctx.body = cachedBody;
      } else {
        await next();
        cccache.set(key, ctx.body, 1000 * 60 * 60 * 4); //存放4小时
      }
    } else {
      await next();
    }
  }
}

module.exports = cache;