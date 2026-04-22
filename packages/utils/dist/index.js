import { useState, useEffect } from 'react';

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
  const [dir, setDir] = useState("ltr");
  useEffect(() => {
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

export { cn, useDirection };
