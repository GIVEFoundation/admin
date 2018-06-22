export function basePath(url) {
  return url.split('/').slice(0,3).join('/');
}
