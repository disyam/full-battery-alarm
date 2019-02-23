module.exports = {
  apps: [
    {
      name: "battery",
      script: "index.js",
      instances: 1,
      autorestart: true
    }
  ]
};
