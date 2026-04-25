'use strict';

var react = require('react');

// src/cn.ts
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
function readDirection(el) {
  if (typeof document === "undefined") return "ltr";
  const target = el ?? document.documentElement;
  const dir = getComputedStyle(target).direction;
  return dir === "rtl" ? "rtl" : "ltr";
}
function useDirection(ref) {
  const [dir, setDir] = react.useState("ltr");
  react.useEffect(() => {
    const target = ref?.current ?? document.documentElement;
    setDir(readDirection(target));
    const observers = [];
    let node = target;
    while (node) {
      const mo = new MutationObserver(() => {
        setDir(readDirection(ref?.current ?? document.documentElement));
      });
      mo.observe(node, { attributes: true, attributeFilter: ["dir"] });
      observers.push(mo);
      node = node.parentElement;
    }
    return () => {
      for (const mo of observers) mo.disconnect();
    };
  }, [ref]);
  return dir;
}
var MAC_PLATFORMS = /Mac|iPhone|iPad|iPod/;
function isMac() {
  if (typeof navigator === "undefined") return false;
  return MAC_PLATFORMS.test(navigator.platform);
}
function parseCombo(combo) {
  const parts = combo.toLowerCase().split("+").map((p) => p.trim()).filter(Boolean);
  const result = {
    key: "",
    ctrl: false,
    meta: false,
    shift: false,
    alt: false,
    mod: false
  };
  for (const part of parts) {
    switch (part) {
      case "ctrl":
      case "control":
        result.ctrl = true;
        break;
      case "meta":
      case "cmd":
      case "command":
      case "win":
        result.meta = true;
        break;
      case "shift":
        result.shift = true;
        break;
      case "alt":
      case "option":
      case "opt":
        result.alt = true;
        break;
      case "mod":
        result.mod = true;
        break;
      default:
        result.key = part;
    }
  }
  return result;
}
function normalizeEventKey(e) {
  const k = e.key.toLowerCase();
  if (k === " " || k === "spacebar") return "space";
  if (k === "esc") return "escape";
  if (k === "arrowup") return "up";
  if (k === "arrowdown") return "down";
  if (k === "arrowleft") return "left";
  if (k === "arrowright") return "right";
  return k;
}
function matchesCombo(e, combo) {
  const mac = isMac();
  const needCtrl = combo.ctrl || combo.mod && !mac;
  const needMeta = combo.meta || combo.mod && mac;
  if (needCtrl !== e.ctrlKey) return false;
  if (needMeta !== e.metaKey) return false;
  if (combo.shift !== e.shiftKey) return false;
  if (combo.alt !== e.altKey) return false;
  return normalizeEventKey(e) === combo.key;
}
function isEditableTarget(target) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  return target.isContentEditable;
}
function useHotkey(combo, handler, opts = {}) {
  const {
    enabled = true,
    target,
    preventDefault = true,
    allowInInputs = false,
    deps = []
  } = opts;
  const handlerRef = react.useRef(handler);
  handlerRef.current = handler;
  const parsed = react.useMemo(() => {
    const list = Array.isArray(combo) ? combo : [combo];
    return list.map(parseCombo);
  }, [Array.isArray(combo) ? combo.join("|") : combo]);
  react.useEffect(() => {
    if (!enabled) return;
    if (typeof document === "undefined") return;
    const node = target ?? (typeof document !== "undefined" ? document : void 0);
    if (!node) return;
    const onKeyDown = (e) => {
      const ke = e;
      if (!allowInInputs && isEditableTarget(ke.target)) return;
      for (const c of parsed) {
        if (matchesCombo(ke, c)) {
          if (preventDefault) ke.preventDefault();
          handlerRef.current(ke);
          return;
        }
      }
    };
    node.addEventListener("keydown", onKeyDown);
    return () => node.removeEventListener("keydown", onKeyDown);
  }, [enabled, target, preventDefault, allowInInputs, parsed, ...deps]);
}

exports.cn = cn;
exports.matchesCombo = matchesCombo;
exports.parseCombo = parseCombo;
exports.useDirection = useDirection;
exports.useHotkey = useHotkey;
