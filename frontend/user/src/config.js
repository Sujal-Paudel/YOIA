const productionConfig = {
  RELEASE_FEATURE: {
    SETTINGS: {
      ABOUT: true,
      LOGOUT: true,
      NOTIFICATIONS: false,
      HELP: false,
    },
  },
};

function trueAll(obj) {
  return JSON.parse(JSON.stringify(obj).replace(/false/g, true));
}

module.exports = JSON.parse(process.env.REACT_APP_PRODUCTION)
  ? productionConfig
  : trueAll(productionConfig);
