module.exports = socials => {
  return Object.entries(socials)
    .map(
      val =>
        !!val[1] && {
          name: val[0],
          url: val[1]
        }
    )
    .filter(val => val);
};
