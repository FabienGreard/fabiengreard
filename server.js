const app = require("express")(),
  path = require("path"),
  config = require("./config/main"),
  morgan = require("morgan"),
  {
    getDirectories,
    getSocials,
    seo,
    errorHandler,
    servFile,
    forceHttps,
    winston,
    build
  } = require("./utils");

// Minify + prefixer css
build.css(path.join(__dirname, "public/style.css"));

// Minify js
build.js(path.join(__dirname, "public/app.js"));

// Force https redirect
app.use(forceHttps);

// Generate robots.txt disallow protected routes
seo.genRobots("protected", "robots.txt");
seo.genSitemap("routes", "sitemap.xml");

// View engine setup
app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "routes"),
  path.join(__dirname, "protected")
]);
app.set("view engine", "pug");

// Logger
app.use(morgan(config.log, { stream: winston.stream }));

// Private folder
servFile(app, getDirectories("protected"), {
  exts: ["html", "md", "pug"],
  isProtected: true,
  baseDir: "../protected/"
});

// Routes folder
servFile(app, getDirectories("routes"), {
  exts: ["html", "md", "pug"],
  baseDir: "../routes/"
});

// Public folder
servFile(app, [{ name: "public" }]);

const routes = [
  {
    name: "FakeStoreJS a way to quiclky mock data",
    url: "/fakestorejs-a-way-to-quiclky-mock-data"
  },
  {
    name: "Choosing a designer is painfull",
    url: "/choosing-a-designer-is-painfull"
  },
  {
    name: "Recap an entrepreneur story",
    url: "/recap-an-entrepreneur-story"
  },
  { name: "First Post", url: "/first-post" }
];

app.get("/", (req, res, next) => {
  res.render("index", {
    routes: routes,
    socials: getSocials(config.socials),
    googleAnalyticsId: config.googleAnalyticsId
  });
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use(errorHandler);

module.exports = app;
