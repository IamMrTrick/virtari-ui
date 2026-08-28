'use strict';

var chunkSREYN7I5_cjs = require('./chunk-SREYN7I5.cjs');
var React = require('react');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

var useReactEffectEvent = React__namespace[" useEffectEvent ".trim().toString()];
var useReactInsertionEffect = React__namespace[" useInsertionEffect ".trim().toString()];
function useEffectEvent(callback) {
  if (typeof useReactEffectEvent === "function") {
    return useReactEffectEvent(callback);
  }
  const ref = React__namespace.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  if (typeof useReactInsertionEffect === "function") {
    useReactInsertionEffect(() => {
      ref.current = callback;
    });
  } else {
    chunkSREYN7I5_cjs.useLayoutEffect(() => {
      ref.current = callback;
    });
  }
  return React__namespace.useMemo(() => ((...args) => ref.current?.(...args)), []);
}

exports.useEffectEvent = useEffectEvent;
