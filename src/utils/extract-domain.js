const getDomain = (url) => {
  const regex = /.[a-z]+.(com|org|co)/g;
  const found = url.match(regex)[0];
  let domain = found.slice(1);
  return domain;
};

export { getDomain };
