const POSTFLOW_SECRET_KEY = Symbol('POSTFLOW_SECRET_KEY')

function createNextSequence() {
  const sequence = []
  sequence[POSTFLOW_SECRET_KEY] = true
  return sequence
}

function validateSequence(sequence) {
  return typeof sequence === 'object'
    && sequence instanceof Array
    && sequence[POSTFLOW_SECRET_KEY]
}

function defaultAssign(prev, next) {
  return next;
}

module.exports = function createPostflow(assign) {
  if (assign && typeof assign !== 'function') {
    throw new Error('Postflow create first argument expects to be a function or falsy');
  }
  assign = assign || defaultAssign;

  return function extraflow() {
    const initialSequence = Array.from(arguments);

    return function enhancer(props, sequence) {
      const isRoot = !sequence || !validateSequence(sequence)
      if (isRoot) {
        sequence = createNextSequence()
      }
      for (let i = 0; i < initialSequence.length; i++) {
        const payload = initialSequence[i](props, sequence)
        if (typeof payload === 'function') {
          sequence.push(payload)
        } else {
          props = assign(props, payload, sequence)
        }
      }

      return isRoot && sequence.length ? extraflow(...sequence)(props) : props
    }
  }
}
