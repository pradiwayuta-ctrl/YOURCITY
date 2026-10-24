const handlers = {};
export const on = (name, fn) => ((handlers[name] ??= new Set()).add(fn), () => handlers[name].delete(fn));
export const emit = (name, data) => handlers[name]?.forEach((fn) => fn(data));
