// pm2 logs config file
// pm2 start mahaanexpress-pm2.config.js

module.exports = {
  apps: [
    {
      name: "mahaanexpress",
      script: "node index.js",
      output: "/dev/null",
      // output: "./logs/mahaanexpress-out.log",
      error: "./logs/mahaanexpress-error.log",
      log_date_format: "MMM DD hh:mm:ss A",
    },
  ],
};
