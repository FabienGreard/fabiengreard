const uglifyJS = require("uglify-js"),
  cleanCss = require("clean-css"),
  fs = require("fs");

const js = path => {
  const data = fs.readFileSync(path, "utf-8");
  const { code } = uglifyJS.minify(data);
  fs.writeFileSync(path, code);
};

const css = path => {
  const data = fs.readFileSync(path, "utf-8");
  const { styles } = new cleanCss({ compatibility: "*" }).minify(data);
  fs.writeFileSync(path, styles);
};

module.exports = {
  js,
  css
};
