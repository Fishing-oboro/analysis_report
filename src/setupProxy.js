const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use('/api', createProxyMiddleware({
      pathRewrite: {'^/api/':'/'}, 
      target: process.env.API_TARGET,
      changeOrigin: true,
    }));
    app.use('/db', createProxyMiddleware({
      pathRewrite: {'^/db/':'/'}, 
      target: process.env.DB_TARGET,
      changeOrigin: true,
    }));
}