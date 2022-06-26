// 2.0.0-2020.04.28

import moment from "moment";

const isMobile = navigator.userAgent.match(
  /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
);

const idToTicketNo = (_id) => _id.substring(0, 8).toUpperCase();

const dateFromObjectId = (_id) =>
  moment(parseInt(_id.substring(0, 8), 16) * 1000).format(
    "ddd YYYY/MM/DD hh:mm:ss A"
  );

const capitalizeFirst = (str) => {
  const mid = str.split("");
  return mid[0].toUpperCase() + mid.splice(1).join("");
};

const camelToPascalCase = (str) => {
  let regexp = /([A-Z])/g;
  str.match(regexp);
  let splittedText = str.replace(regexp, " $1");
  return splittedText.charAt(0).toUpperCase() + splittedText.slice(1);
};

const getProps = (object, access) => {
  try {
    const nest = access.split(".");
    let prop = object;
    nest.forEach((e) => {
      prop = prop[e];
    });
    return prop;
  } catch (e) {
    return null;
  }
};

const getStoredProps = (itemName, access) => {
  try {
    if (!access) {
      return JSON.parse(localStorage.getItem(itemName));
    }
    const nest = access.split(".");
    let prop = JSON.parse(localStorage.getItem(itemName));
    nest.forEach((e) => {
      prop = prop[e];
    });
    return prop;
  } catch (e) {
    return null;
  }
};

const setLocalStorage = ({ itemName, key, data }) => {
  try {
    if (key) {
      //**TODO** work for nested key */
      // const nest = key.split(".");
      // nest.forEach(e => {
      //   prop = prop[e];
      // });
      let prop = JSON.parse(localStorage.getItem(itemName)) || {};
      prop[key] = data;
      localStorage.setItem(itemName, JSON.stringify(prop));
      return prop;
    } else {
      localStorage.setItem(itemName, JSON.stringify(data));
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

const calculatePrice = {
  foodDelivery: ({ price }) => {
    if (price >= 500) return 50;
    if (price >= 400) return 40;
    return 30;
  },
};

const convertArrayToObject = (array, key) => {
  return array.reduce((obj, item) => {
    return {
      [item[key]]: item,
      ...obj,
    };
  }, {});
};

const processFlatObject = (o) => {
  var oo = {},
    t,
    parts,
    part;
  for (var k in o) {
    t = oo;
    parts = k.split(".");
    var key = parts.pop();
    while (parts.length) {
      part = parts.shift();
      t = t[part] = t[part] || {};
    }
    t[key] = o[k];
  }
  return oo;
};

export {
  isMobile,
  idToTicketNo,
  dateFromObjectId,
  capitalizeFirst,
  camelToPascalCase,
  getProps,
  getStoredProps,
  setLocalStorage,
  calculatePrice,
  convertArrayToObject,
  processFlatObject,
};
