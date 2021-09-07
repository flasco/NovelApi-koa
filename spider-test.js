const { parserFactory } = require('./src/parser/index');
const assert = require('assert');

(async () => {
  const parser = parserFactory('https://www.0794.org/ea/24442/');

  const chaptersListUrl = 'https://www.0794.org/ea/24442/';

  const latestChapterName = await parser.getLatestChapter(chaptersListUrl);
  assert.strictEqual(typeof latestChapterName, 'string');
  assert.strictEqual(latestChapterName.length > 0, true);

  const chapterList = await parser.getChapterList(chaptersListUrl);

  assert.strictEqual(Array.isArray(chapterList), true);
  assert.strictEqual(chapterList.length > 0, true);
  assert.strictEqual(chapterList[0].title != null, true);
  assert.strictEqual(chapterList[0].url != null, true);

  const chapterUrl = 'https://www.0794.org/ea/24442/7563955.html';

  const content = await parser.getChapterDetail(chapterUrl);
  assert.strictEqual(content.title != null, true);
  assert.strictEqual(content.content != null, true);

  const searchX = await parser.search('这游戏也太真实了');

  console.log(searchX);

  console.log('test ok!');
  process.exit(0);
})();
