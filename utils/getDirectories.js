const fs = require("fs"),
  path = require("path");

const isDirectory = source => fs.lstatSync(source).isDirectory();
const isExist = source => fs.existsSync(source);

module.exports = getDirectories = source => {
  const directories = isExist(source)
    ? fs
        .readdirSync(source)
        .map(name => path.join(source, name))
        .filter(isDirectory)
    : [];

  return {
    [Symbol.iterator]: function*() {
      let i = 0;
      const size = Object.keys(this.values).length;
      while (i < size) {
        yield this.values[i++];
      }
    },
    values: {
      ...directories.map(name => {
        return {
          name: name.slice(source.length + 1),
          url:
            "/" +
            name
              .toLowerCase()
              .slice(source.length + 1)
              .split(" ")
              .join("-")
        };
      })
    }
  };
};
