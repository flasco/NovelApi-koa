const { qdGGRnkList, qdMMRnkLst } = require('../src/core/ranklist');

test('qdGGRnkList', async () => {
  const rank = await qdGGRnkList(2);
  expect(rank.length).toBeGreaterThan(0);
  expect(rank.length).toBeLessThanOrEqual(50);
  expect(rank[0].author).not.toBeNull();
  expect(rank[0].latestChapter).not.toBeNull();
  expect(rank[0].name).not.toBeNull();
  expect(rank[0].type).not.toBeNull();
}, 1000000);


test('qdMMRnkList', async () => {
  const rank = await qdMMRnkLst(2);
  expect(rank.length).toBeGreaterThan(0);
  expect(rank.length).toBeLessThanOrEqual(50);
  expect(rank[0].author).not.toBeNull();
  expect(rank[0].latestChapter).not.toBeNull();
  expect(rank[0].name).not.toBeNull();
  expect(rank[0].type).not.toBeNull();
}, 1000000);
