const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use('/api', createProxyMiddleware({
      pathRewrite: {'^/api/':'/'}, 
      target: 'http://localhost:8000',
      changeOrigin: true,
    }));
    app.use('/db', createProxyMiddleware({
      pathRewrite: {'^/db/':'/'}, 
      target: 'http://localhost:4000',
      changeOrigin: true,
    }));
}