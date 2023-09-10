const { createProxyMiddleware } = require("http-proxy-middleware");

/* NOTE: Passing path to proxy function allows globbing and/or pattern 
matching the path which is more flexible than the express route matching. */

// Does Not Need To Be Imported,
// Automatically Registered During Server Start.
module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://backend",
      pathRewrite: { "^/api": "" }
    })
  );
};