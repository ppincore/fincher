import { isFunction, isRecord } from '@shared/lib/typeGuards';

function hasWindowObject() {
  return typeof window !== 'undefined' && window.document;
}

function checkIfHasReactDevTools(
  window: Window & typeof globalThis,
): window is Window &
  typeof globalThis &
  Record<'__REACT_DEVTOOLS_GLOBAL_HOOK__', Record<string, any>> {
  if (!('__REACT_DEVTOOLS_GLOBAL_HOOK__' in window)) {
    return false;
  }

  if (!isRecord(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
    return false;
  }

  return true;
}

export function disableReactDevTools() {
  if (!hasWindowObject()) {
    return;
  }

  if (!checkIfHasReactDevTools(window)) {
    return;
  }

  Object.entries(window.__REACT_DEVTOOLS_GLOBAL_HOOK__).forEach(
    ([key, value]) => {
      if (!checkIfHasReactDevTools(window)) {
        return;
      }

      if (key === 'renderers') {
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = new Map();
        return;
      }

      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = isFunction(value)
        ? Function.prototype
        : null;
    },
  );
}
