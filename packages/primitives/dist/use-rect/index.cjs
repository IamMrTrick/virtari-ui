'use strict';

var chunkJKQZZFPT_cjs = require('../chunk-JKQZZFPT.cjs');
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

function useRect(measurable) {
  const [rect, setRect] = React__namespace.useState();
  React__namespace.useEffect(() => {
    if (measurable) {
      const unobserve = chunkJKQZZFPT_cjs.observeElementRect(measurable, setRect);
      return () => {
        setRect(void 0);
        unobserve();
      };
    }
    return;
  }, [measurable]);
  return rect;
}

exports.useRect = useRect;
