const extraflow = require('../lib');

describe('examples', () => {
  it('World Wide Web', () => {
    const enhancer = extraflow(
      () => () => () => (target) => target.join(' '),
      () => () => (target) => target.concat(['Web']),
      () => (target) => target.concat(['Wide']),
      (target) => target.concat(['World'])
    )

    expect(enhancer([])).toBe('World Wide Web');
  });
})
