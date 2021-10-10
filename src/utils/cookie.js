export function setCookie(name, value, options = {}) {
  const cookie = `${name}=${value}`;
  const optionString = Object.entries(options).map(([key, value]) => (
    value === true ? `${key}` : `${key}=${value}`
  )).join(';');

  document.cookie = `${cookie};${optionString}`;
}

export function clearCookie(name) {
  setCookie(name, '', { 'max-age': -1 });
}
