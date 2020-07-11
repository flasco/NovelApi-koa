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

function parserFactory(url) {
  const { host: hostKey } = new URL(url);
  if (parserMap[hostKey] != null) return parserMap[hostKey];

  throw new Error('未收录的网址');
}

function getSearchParserFromSites() {
  const parsers = [];
  Object.keys(parserMap).map(key => {
    const parser = parserMap[key];
    if (parser.canSearch) parsers.push(parser);
  });
  if (parsers.length > 0) return parsers;
  throw new Error('parser 无效');
}

exports.parserFactory = parserFactory;
exports.getSearchParserFromSites = getSearchParserFromSites;
