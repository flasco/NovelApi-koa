const fse = require('fs-extra');
const path = require('path');

const configPath = path.resolve(__dirname, './config');

const baseParser = require('./base.parser');

const configDir = fse.readdirSync(configPath);

const jsons = configDir.map(file =>
  fse.readJsonSync(path.resolve(configPath, file))
);

const parserMap = {};

jsons.forEach(config => {
  const { host } = new URL(config.site);
  parserMap[host] = new baseParser(config);
});

const allSites = Object.keys(parserMap);

function parserFactory(url) {
  const { host: hostKey } = new URL(url);
  if (parserMap[hostKey] != null) return parserMap[hostKey];

  throw new Error('未收录的网址');
}

function getSiteMap() {
  return Object.keys(parserMap);
}

// sites - ['xs.la', 'asd.sx'];
function getSearchParserFromSites(sites = []) {
  const parsers = [];
  if (sites.length < 1) sites = allSites; // 设个默认值
  Object.keys(parserMap).map(key => {
    if (sites.some(kex => key.includes(kex))) {
      const parser = parserMap[key];
      if (parser.canSearch) parsers.push(parser);
    }
  });
  if (parsers.length > 0) return parsers;
  throw new Error('parser 无效');
}

exports.getSiteMap = getSiteMap;
exports.parserFactory = parserFactory;
exports.getSearchParserFromSites = getSearchParserFromSites;
