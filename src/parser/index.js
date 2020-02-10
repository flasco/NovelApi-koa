const biquParser = require('./biqu.parser');
const xslaParser = require('./xsla.parser');
const x23usParser = require('./x23us.parser');
const kanshuzParser = require('./kanshuz.parser');
const booktxtParser = require('./booktxt.parser');

const { addCount } = require('../core/source-rank');

const parserArr = [
  new x23usParser(),
  new xslaParser(),
  new kanshuzParser(),
  new biquParser(),
  new booktxtParser()
];

function parserFactory(host) {
  for (const parser of parserArr) {
    const haveParser = parser.key.some(item => host.includes(item));
    if (haveParser) {
      addCount(parser.key[0]);
      return parser;
    }
  }

  throw new Error('未收录的网址');
}

exports.parserFactory = parserFactory;
