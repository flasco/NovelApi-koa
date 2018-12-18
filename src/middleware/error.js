module.exports = () => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      if (ctx.header['content-type'] === 'application/json') {
        console.log(error);
        ctx.json(error.code, error.msg || error.message);
      } else {
        throw error;
      }
    }
  }
}