module.exports = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    X_API_KEY: process.env.X_API_KEY,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
  },
  images: {
    domains: [process.env.IMAGE_DOMAIN]
  }
};
