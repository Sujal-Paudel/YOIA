// pm2 logs config file
// pm2 start yoia-pm2.config.js

module.exports = {
  apps: [
    {
      name: "yoia",
      script: "node index.js",
      output: "/dev/null",
      // output: "./logs/yoia-out.log",
      error: "./logs/yoia-error.log",
      log_date_format: "MMM DD hh:mm:ss A",
    },
  ],
};
