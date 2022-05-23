const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public'
  },
  experimental: {
    emotion: true,
    scrollRestoration: true
  },
  swcMinify: true,
  reactStrictMode: process.env.NODE_ENV === 'development',
  poweredByHeader: process.env.NODE_ENV === 'development',
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    X_API_KEY: process.env.X_API_KEY,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
  },
  images: {
    domains: [process.env.IMAGE_DOMAIN]
  }
});
