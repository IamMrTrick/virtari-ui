'use strict';

// src/cn.ts
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

exports.cn = cn;
