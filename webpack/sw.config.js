const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = new GenerateSW({
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      urlPattern: new RegExp('^https://fonts.googleapis.com/'),
      handler: 'staleWhileRevalidate',
      options: {
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: new RegExp('^https://fonts.gstatic.com/'),
      handler: 'staleWhileRevalidate',
      options: {
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: new RegExp('^https://yt3.ggpht.com/'),
      handler: 'staleWhileRevalidate',
      options: {
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
});
