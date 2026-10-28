export function parseJwt<T>(token: string): T {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');

  return JSON.parse(window.atob(base64));
}
