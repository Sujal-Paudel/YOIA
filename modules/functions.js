const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const sendVerificationMail = ({ fullName, email, code }) => {
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Confirm your Email",
    text: `Dear ${fullName},\nYour Confirmation Code for ${process.env.PROJECT_NAME_LONG} is: ${code}`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
};

const sendForgotMail = ({ fullName, email, resetKey }) => {
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Reset Your Password",
    text: `Dear ${fullName},
You've requested to reset your password for ${process.env.PROJECT_NAME}.

Here is your password reset link.
${process.env.PROJECT_URL}/resetlink/${resetKey}/

This link will expire in ${process.env.MONGODB_TTL}

If you didn't request to reset the password, you can kindly ignore this email.
    
Thankyou,
The ${process.env.PROJECT_NAME} Team`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
};

function emailCodeGenerator() {
  let text = "";
  const possible = "0123456789";
  for (let i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function resetLinkGenerator() {
  let resetKey = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 64; i++) {
    resetKey += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return resetKey;
}

function getCookiesList(cookieString) {
  const json = {};

  if (cookieString && cookieString != "") {
    let crumbs = cookieString.split("; ");
    for (let i = crumbs.length - 1; i >= 0; --i) {
      let name, value;
      let eqIdx = crumbs[i].indexOf("=");
      if (eqIdx == -1) {
        name = crumbs[i];
        value = "";
      } else {
        name = crumbs[i].substring(0, eqIdx);
        value = crumbs[i].substring(eqIdx + 1);
      }
      json[name] = value;
    }
  }
  return json;
}

function generateJWT(data, { userType }) {
  // IMPORTANT: avoid adding unwanted key to the token object; send filtered data
  const tokenFields = {};
  if (userType === "admin") {
    tokenFields.admin = data.admin;
    tokenFields.userType = "admin";
  } else if (userType === "user") {
    tokenFields.paidUser = data.paidUser;
    tokenFields.username = data.username;
    tokenFields.userType = "user";
  }

  const token = jwt.sign(tokenFields, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_TTL,
  });

  return [
    userType === "admin" ? `${process.env.PROJECT_NAME}_admin` : process.env.PROJECT_NAME,
    token,
    {
      domain:
        userType === "admin" ? process.env.ADMIN_DOMAIN_NAME : process.env.DOMAIN_NAME,
      secure: JSON.parse(process.env.DEPLOYMENT),
      httpOnly: true,
      sameSite: true,
      expires: new Date(Date.now() + +process.env.JWT_TTL),
      path: "/",
    },
  ];
}

function isValidNepalPhoneNumber(val) {
  if (
    val.length === 10 &&
    !["3", "7", "9"].includes(val.substr(2, 1)) &&
    !isNaN(+val) &&
    val.substr(0, 2) === "98"
  )
    return true;
  return false;
}

module.exports = {
  sendVerificationMail,
  sendForgotMail,
  emailCodeGenerator,
  resetLinkGenerator,
  getCookiesList,
  generateJWT,
  isValidNepalPhoneNumber,
};
