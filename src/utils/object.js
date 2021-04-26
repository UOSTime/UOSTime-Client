export function isObject(obj) {
  return (typeof obj === 'object' && obj !== null);
}

export function getValue(obj, ...props) {
  return props.reduce((o, prop) => (isObject(o) ? o[prop] : undefined), obj);
}
