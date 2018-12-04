"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var builinSymbol = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? Symbol : function SymbolLike() {
  return "__POSTFLOW_UNIQUE_KEY__ZXh0cmFmbG93__";
};

var POSTFLOW_SECRET_KEY = builinSymbol('__POSTFLOW_UNIQUE_KEY__');

function createNextSequence() {
  var sequence = [];
  Object.defineProperty(sequence, POSTFLOW_SECRET_KEY, {
    enumerable: false,
    writable: false,
    value: true
  });
  return sequence;
}

function validateSequence(sequence) {
  return (typeof sequence === "undefined" ? "undefined" : _typeof(sequence)) === 'object' && sequence instanceof Array && sequence[POSTFLOW_SECRET_KEY];
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
    var initialSequence = Array.from(arguments);

    return function enhancer(props, sequence) {
      var isRoot = !sequence || !validateSequence(sequence);
      if (isRoot) {
        sequence = createNextSequence();
      }
      for (var i = 0; i < initialSequence.length; i++) {
        var payload = initialSequence[i](props, sequence);
        if (typeof payload === 'function') {
          sequence.push(payload);
        } else {
          props = assign(props, payload, sequence);
        }
      }

      return isRoot && sequence.length ? extraflow.apply(this, sequence)(props) : props;
    };
  };
};