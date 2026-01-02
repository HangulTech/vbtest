export default () => ({
  app: {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10)
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'changeme'
  },
  database: {
    url: process.env.DATABASE_URL
  }
});
