const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function(app) {
  app.use(
    createProxyMiddleware('/baseURL', {
      target: 'https://dev-be.client.gear5.guru',
      changeOrigin: true,
      pathRewrite: {
        '^/baseURL': ''
      },
      headers: {
        Connection: 'keep-alive'
      }
    })
  )
  app.use(
    createProxyMiddleware('/searchURL', {
      target: 'https://dev-search.gear5.guru',
      changeOrigin: true,
      pathRewrite: {
        '^/searchURL': ''
      },
      headers: {
        Connection: 'keep-alive'
      }
    })
  )
}
