'use strict';

// src/number/number.ts
function clamp(value, [min, max]) {
  return Math.min(max, Math.max(min, value));
}

exports.clamp = clamp;
