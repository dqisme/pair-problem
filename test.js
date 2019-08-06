var test = require('ava');
var normalize = require('./main').normalize;

test('should success', t => {
  t.pass()
});

test('normalize', t => {
  const solution = [
    [0,2,1],
    [1,0,2],
    [2,1,0],
  ];
  const normalizedSolution = [
    [0,1,2],
    [2,0,1],
    [1,2,0]
  ];
  t.deepEqual(normalize(solution), normalizedSolution);
});