const { isValidNepalPhoneNumber } = require("./functions");
const fetch = require("node-fetch");

async function requestSMSApi(phoneNumber, text) {
  return new Promise((resolve, reject) => {
    console.log(phoneNumber, text);
    const req = { sim: 0, phone: phoneNumber, text };
    // is Nepal telecom
    if (["4", "5", "6"].includes(phoneNumber.slice(2, 3))) req.sim = 0; // OVERRIDDEN

    // TODO integrate password here and in server for server security
    // TODO fetchtimeout of 5 seconds
    fetch(`http://35.212.173.99/sendsms/${process.env.SMS_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) resolve(true);
        else resolve({ error: true });
      })
      .catch((e) => {
        console.log(e);
        resolve({ error: true });
      });
  });
}

module.exports = (phoneNumber, { text }) => {
  return new Promise(async (resolve, reject) => {
    // if (!isValidNepalPhoneNumber(phoneNumber)) resolve({ error: "INVALID_PHONE" });

    const result = await requestSMSApi(phoneNumber, text);
    resolve({ success: true });
  });
};
