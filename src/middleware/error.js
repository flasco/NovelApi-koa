module.exports = () => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      const { method, url, body, query } = ctx.request;
      if (method === 'GET') {
        console.error(method, url, query);
      } else if (method === 'POST') {
        console.error(method, url, body);
      }

      const contentType = ctx.header['content-type'] || ctx.header['contenttype'];
      if (contentType === 'application/json') {
        ctx.json(error.code || 10000, error.msg || error.message);
      } else {
        throw error;
      }
    }
  }
}