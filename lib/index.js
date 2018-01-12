"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const overflow_TAIL_SECRET_MARK = Symbol(`tail`);

function createTail() {
  const tail = [];
  tail[overflow_TAIL_SECRET_MARK] = true;
  return tail;
}

function validateTail(tail) {
  return typeof tail === `object` && tail instanceof Array && tail[overflow_TAIL_SECRET_MARK];
}

function overflow(...chain) {
  return function sequence(props, tail) {
    const isRoot = !tail || !validateTail(tail);
    if (isRoot) {
      tail = createTail();
    }
    for (let i = 0; i < chain.length; i++) {
      const payload = chain[i](props, tail);
      if (typeof payload === `function`) {
        tail.push(payload);
      } else if (typeof payload === `object`) {
        props = Object.assign({}, props, payload);
      }
    }

    return isRoot && tail.length ? overflow(...tail)(props) : props;
  };
}

exports.default = overflow;
module.exports = exports["default"];