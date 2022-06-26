// v1.0.0-2020.05.05

const jwt = require("jsonwebtoken");

const { getCookiesList, generateJWT } = require("../modules/functions");

const filterJWT = (string, headers) => {
  try {
    const isAdminHost = headers.origin.split("//")[1].split(".")[0] === "admin";

    const cookieObject = getCookiesList(string);

    if (isAdminHost || headers["x-forwarded-host"] === "localhost:3001") {
      return cookieObject[`${process.env.PROJECT_NAME}_admin`];
    } else {
      return cookieObject[process.env.PROJECT_NAME];
    }
  } catch (err) {
    return;
  }
};

const requiresRefresh = (expiry) => {
  expiry - parseInt(new Date().getTime() / 1000) <
    +process.env.COOKIE_REFRESH_TIME;
};

module.exports = ({ userType, jwtFields }) => (req, res, next) => {
  try {
    const token = filterJWT(req.headers.cookie, req.headers);
    if (!token) throw { reset: true, message: "no jwt" };
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded.userType !== userType) {
      throw { reset: true, message: `not ${userType}` };
    }
    if (jwtFields) {
      Object.keys(jwtFields).forEach((e) => {
        if (decoded[e] !== jwtFields[e]) throw { message: "no field in jwt" };
      });
    }

    req.jwt = decoded;

    if (requiresRefresh(req.jwt.exp)) {
      res.cookie(...generateJWT(req.jwt, { userType }));
    }
    next();
  } catch (err) {
    console.log(err);
    if (err.reset) {
      res.clearCookie(process.env.PROJECT_NAME, {
        domain: process.env.DOMAIN_NAME,
        secure: JSON.parse(process.env.DEPLOYMENT),
        httpOnly: false,
        path: "/",
      });
    }
    return res.status(401).json({ message: err.message });
  }
};
