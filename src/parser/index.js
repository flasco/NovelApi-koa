const biquParser = require('./biqu.parser');
const xslaParser = require('./xsla.parser');
const x23usParser = require('./x23us.parser');
const mxslaParser = require('./mxsla.parser');
const kanshuzParser = require('./kanshuz.parser');

const parserArr = [
  null,
  new x23usParser(),
  new xslaParser(),
  new kanshuzParser(),
  null,
  new biquParser(),
  new mxslaParser(),
];

function parserFactory(host) {
  let index = ((`${host}`).indexOf('x23us') > -1) && 1
    || ((`${host}`).indexOf('www.xs.la') > -1) && 2
    || ((`${host}`).indexOf('kanshuzhong') > -1) && 3
    || ((`${host}`).indexOf('qidian') > -1) && 4
    || ((`${host}`).indexOf('biqu.cm') > -1) && 5
    || ((`${host}`).indexOf('m.xs.la') > -1) && 6
    || -1;
    if (index === -1) throw new Error('未收录的网址');
  return parserArr[index];
}

exports.parserFactory = parserFactory;