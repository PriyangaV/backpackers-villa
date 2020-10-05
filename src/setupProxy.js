const { createProxyMiddleware } = require('http-proxy-middleware');

// - config function with reference of the application
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3002',
      changeOrigin: true
    })
  );
};

// http://localhost:3000/api/v1/rentals -> http://localhost:3002/api/v1/rentals
