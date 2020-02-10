const fse = require('fs-extra');
const path = require('path');

const configPath = path.resolve(__dirname, './config');

const baseParser = require('./base.parser');

const configDir = fse.readdirSync(configPath);

const jsons = configDir.map(file => fse.readJsonSync(path.resolve(configPath, file)));

const parserMap = {};

function parserFactory(url) {
  const { host: hostKey } = new URL(url);
  if (parserMap[hostKey] != null) return parserMap[hostKey];
  for (const config of jsons) {
    if (config.site.includes(hostKey)) {
      parserMap[hostKey] = new baseParser(config);
      return parserMap[hostKey];
    }
  }

  throw new Error('未收录的网址');
}

exports.parserFactory = parserFactory;
