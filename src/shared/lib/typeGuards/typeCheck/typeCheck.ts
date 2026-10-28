export function isFunction(obj: any): obj is Function {
  return typeof obj === 'function';
}

export function isObject(obj: any): obj is object {
  const type = typeof obj;
  return type === 'object' && obj !== null;
}

export function isRecord<TValue = any>(
  obj: any,
): obj is Record<string | number | symbol, TValue> {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}

export function isArray<TValue = any>(obj: any): obj is Array<TValue> {
  return Array.isArray(obj);
}
