export default (urlWithUsername) => {
  let path;
  try {
    path = new URL(urlWithUsername).pathname;
  } catch {
    path = urlWithUsername;
  }
  const parts = path.split('/').filter((i) => i.length && i !== '/');

  return parts.at(-1);
};
