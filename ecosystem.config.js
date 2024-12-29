module.exports = {
  apps: [
    {
      name: 'linkt-dev',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'linkt-prod',
      script: 'dist/main.js',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
