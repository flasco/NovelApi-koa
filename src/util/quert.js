const cheerio = require('cheerio');

function htmlAnalysis(content, instStr = '') {
  let $;
  if (typeof content === 'string') {
    $ = cheerio.load(content, { decodeEntities: false })('html');
  } else {
    $ = cheerio(content);
  }

  if (instStr.length < 1) return $;
  const insts = instStr.split('!')[0].split('@');

  while (insts.length > 1) {
    const inst = insts.shift();
    $ = formatX(inst, $);
  }

  const inst = insts[0].split('##')[0];
  const formatApi = inst.includes('.') ? formatX : formatLatest;
  const resX = formatApi(insts[0], $);

  return resX;
}

function formatX(inst, $) {
  const words = inst.split('.');
  switch (words[0]) {
    case 'class': {
      const rx = $.find('.' + words[1].split(/ +/g).join('.'));
      if (words[2] != null) return rx.eq(words[2] || 0);
      return rx;
    }
    case 'id': {
      const rx = $.find('#' + words[1]);
      if (words[2] != null) return rx.eq(words[2] || 0);
      return rx;
    }
    case 'tag': {
      const rx = $.find(words[1]);
      if (words[2] != null) return rx.eq(words[2] || 0);
      return rx;
    }
  }
}

const regxReplace = (str, regx, replaceText) => {
  if (regx.length < 1) return str;
  return str.replace(new RegExp(regx, 'gi'), replaceText);
}
function formatLatest(key, $) {
  const [inst, regx = ''] = key.split('##');
  const [preRegx = '', replaceText = ''] = regx.split('$_$');

  switch (inst) {
    case 'text': {
      const x = [];
      for (let i = 0; i < $.length; i++) {
        x.push(cheerio($[i]).text());
      }
      const text = x.join('\n').trim();
      return regxReplace(text, preRegx, replaceText);
    }
    case 'html': {
      return regxReplace($.html(), preRegx, replaceText);
    }
    default: {
      const result = $.attr(inst);
      return regxReplace(result, preRegx, replaceText);
    }
  }
}

module.exports = htmlAnalysis;
