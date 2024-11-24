export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    node_env: process.env.NODE_ENV || 'development',
    swagger: {
        // Disable in production
        enabled: Boolean(process.env.SWAGGER_ENABLED || true),
        title: process.env.SWAGGER_TITLE,
        description: process.env.SWAGGER_DESCRIPTION,
        version: process.env.SWAGGER_VERSION,
      }
  });