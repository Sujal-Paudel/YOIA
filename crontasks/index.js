const cron = require("node-cron");

module.exports = async () => {
  // [sms limit] remove sms limit | everyday at 8 AM
  cron.schedule("0 8 * * *", async () => {
    global.smsLimitForToday = false;
  });
};
