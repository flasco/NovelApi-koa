class FetchException extends Error {
  constructor(code, msg) {
    super(`code: ${code}, msg: ${msg}`);
    this.code = code || 400;
    this.msg = msg;
    this.errorType = 'FetchError';
  }
}

module.exports = FetchException;
