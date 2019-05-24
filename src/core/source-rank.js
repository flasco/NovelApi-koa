
const rankArr = {};

function addCount(name) {
  if (rankArr[name] == null) rankArr[name] = 1;
  else {
    rankArr[name]++;
  }
}

function getRank() {
  return rankArr;
}

exports.addCount = addCount;
exports.getRank = getRank;