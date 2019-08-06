const _ = require('lodash');

const arrange = n => // we will find the arrangements of pair for there are `n` members in the team.
  (n === 1 ? // for the simplest case, if there is only one member
    [[0]] : // the only pair of the only arrangement is the member itself (aka. he/she should solo).
    (n % 2 ? // we will consider two cases by parity of n.
      arrange(n - 1) // for odd case, the arrangements is based on the `n-1` arrangements.
        .map(arrangement => arrangement.concat(n - 1)) // the new member should solo for every arrangement.
        .concat(_.flatMap(arrange(n - 1), arrangement => // for each arrangement
          arrangement.map((member, index) => // every one in the arrangement should
            [..._.take(arrangement, index), n - 1, ..._.slice(arrangement, index + 1), member]))) : // pair with the new member and the previous pair would be solo.
      arrange(n - 1) // for even case, the arrangements is also based on the `n-1` arrangements.
        .map(arrangement => // for each arrangement
          arrangement.concat(n - 1)))); // the solo member should pair with the new member.

const check = arrangements => // we will check how many times does each pair appears.
  _(arrangements) // for all the arrangements
    .flatMap(arrangement => _.chunk(arrangement, 2)) // chunk all as pairs.
    .countBy() // and aggregate by amount.
    .values() // for all the amounts
    .thru(counts => counts.every(count => count === 1)) // they should all are to be 1.
    .value();

const transform = arrangements =>
  _(arrangements)
    .keyBy()
    .mapValues(arrangement => _.chunk(arrangement, 2))
    .reduce((result, pairs, arrangement) =>
      _.mergeWith(result,
        ...pairs.map(pair => ({ [_.sortBy(pair)]: [arrangement] })),
        (transformed, transforming) =>
          _(transformed).concat(transforming).compact().sortBy().value()), {});

const solve = situations =>
  _(_(situations).values().first())
    .filter(arrangement =>
      _(situations).values().sumBy(situationArrangements => (_.includes(situationArrangements, arrangement) ? 1 : 0))
      === _(arrangement).split(',').chunk(2).value().length)
    .flatMap((solved) =>
      _(situations)
        .omitBy(arrangements => _.includes(arrangements, solved))
        .thru(restSituations => _.isEmpty(restSituations) ?
          [split(solved)] : solve(restSituations).map(solution => _.concat(split(solved), solution)))
        .value())
    .value();

const split = arrangement => [_(arrangement).split(',').map(_.toNumber).value()];

const sort = solutions =>
  _.map(solutions, (solution, index) =>
    _(solution)
      .map(arrangment =>
        _(arrangment)
          .chunk(2)
          .map(_.sortBy)
          .orderBy(['length', _.identity], ['desc'])
          .flatten()
          .value())
      .sortBy()
      .tap(() => console.log('Sorted: ', index + 1, solutions.length))
      .value());

const dedup = solutions =>
  _(solutions)
    .thru(sort)
    .uniqWith(_.isEqual)
    .value()

const normalize = solution =>
  _.map(solution, arrangement =>
    _.map(arrangement, member =>
      _.chain(solution)
        .first()
        .zip(_.range(_.first(solution).length))
        .fromPairs()
        .get(member)
        .value()));

const pair = n => dedup(solve(transform(arrange(n))).map(normalize));

const test_dedup = (n, completely) => {
  console.log(`test case for ${n}`);
  const all = solve(transform(arrange(n)));
  console.log(all);
  const first = _.first(all);
  const sample = completely ? all : [first];
  const samples = [
    ...sample,
    reverseSolution(first),
    shuffleFirstArrangement(first),
    exchangePair(first),
  ];
  const result = dedup(samples).length === sample.length;
  console.log('...', result ? 'OK' : 'Failed');
  return result;
};

const reverseSolution = _.reverse;

const shuffleFirstArrangement = sample =>
  _(_.first(sample))
    .chunk(2)
    .shuffle()
    .orderBy('length', 'desc')
    .flatten()
    .thru(shuffled => [shuffled, ..._.tail(sample)])
    .value();

const exchangePair = sample =>
  _(_.first(sample))
    .chunk(2)
    .map(_.reverse)
    .flatten()
    .thru(shuffled => [shuffled, ..._.tail(sample)])
    .value();

module.exports = {
  normalize,
};