var _ = require('lodash');

var arrange = n => // we will find the arrangements of pair for there are `n` members in the team.
  (n === 1 ? // for the simplest case, if there is only one member
    [[0]] : // the only pair of the only arrangement is the member itself (aka. he/she should solo).
    (n % 2 ? // we will consider two cases by parity of n.
      arrange(n-1) // for odd case, the arrangements is based on the `n-1` arrangements.
        .map(arrangement => arrangement.concat(n-1)) // the new member should solo for every arrangement.
        .concat(arrange(n-1).flatMap(arrangement => // for each arrangement
          arrangement.map((member, index) => // every one in the arrangement should
            [..._.take(arrangement, index), n-1, ..._.slice(arrangement, index + 1), member]))) : // pair with the new member and the previous pair would be solo.
      arrange(n-1) // for even case, the arrangements is also based on the `n-1` arrangements.
        .map(arrangement => // for each arrangement
          arrangement.concat(n-1)))); // the solo member should pair with the new member.

var check = arrangements => // we will check how many times does each pair appears.
  _(arrangements) // for all the arrangements
    .flatMap(arrangement => _.chunk(arrangement, 2)) // chunk all as pairs.
    .countBy() // and aggregate by amount.
    .value();

var transform = arrangements =>
  _(arrangements)
    .keyBy()
    .mapValues(arrangement => _.chunk(arrangement, 2))
    .reduce((result, pairs, arrangement) =>
      _.mergeWith(result,
        ...pairs.map(pair => ({[_.sortBy(pair)]: [arrangement]})),
        (transformed, transforming) =>
          _(transformed).concat(transforming).compact().sortBy().value()), {});

var solve = situations =>
  _(_(situations).values().first())
    .filter((arrangement, index, arrangements) =>
      _(situations).values().sumBy(situationArrangements => _.includes(situationArrangements,arrangement))
        === arrangements.length)
    .flatMap(solved =>
      product(solved, solve(_.omitBy(situations, arrangements => _.includes(arrangements, solved)))))
    .value();

var product = (value, array) =>
  _.isEmpty(array) ? [value] : array.map(item => _.concat(value, item))