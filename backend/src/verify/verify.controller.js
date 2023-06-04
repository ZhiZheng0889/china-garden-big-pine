const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasOnlyValidProperties = require("../utils/hasOnlyValidProperties");
const hasRequiredProperties = require("../utils/hasRequiredProperties");
const { formatPhoneNumber } = require("../utils/formatPhoneNumber");
const service = require("./verify.service");
const { Vonage } = require("@vonage/server-sdk");
const { VONAGE_KEY, VONAGE_SECRET } = process.env;
const vonage = new Vonage(
  {
    apiKey: VONAGE_KEY,
    apiSecret: VONAGE_SECRET,
  },
  {
    debug: process.env.NODE_ENV === "development",
  }
);

const VALID_VERIFY_PROPERTIES = ["request_id", "code", "user_id"];
const REQUIRED_VERIFY_PROPERTIES = ["request_id", "code"];
const VALID_SEND_PROPERTIES = ["phoneNumber", "countryCode"];
const REQUIRED_SEND_PROPERTIES = ["phoneNumber"];
async function verify(req, res, next) {
  try {
    const { request_id, code, user_id } = req.body.data;
    const response = await vonage.verify.check(request_id, code);
    if (user_id) {
      const foundUser = await service.getUserById(user_id);
      if (!foundUser.isPhoneNumberVerified) {
        foundUser.isPhoneNumberVerified = true;
        const updatedUser = await service.verifyPhoneNumber(user_id, foundUser);
        const formattedUser = updatedUser.toObject();
        delete formattedUser.password;
        return res.status(200).json({
          data: {
            user: formattedUser,
            response,
          },
        });
      }
    }
    return res.status(200).json({ data: response });
  } catch (err) {
    return next({ status: 404, message: err.error_text });
  }
}

function send(req, res, next) {
  const { phoneNumber, countryCode = "1" } = req.body.data;
  vonage.verify
    .start({
      number: formatPhoneNumber(phoneNumber, countryCode),
      brand: "China Garden",
      workflow_id: 6, // use SMS only
    })
    .then((response) => {
      if (response.status === "15") {
        return next({ status: 400, message: response.error_text });
      }
      return res
        .status(200)
        .json({ data: { request_id: response.request_id, response } });
    })
    .catch((err) => {
      return next({ status: 404, message: err });
    });
}

async function verifyCaptcha(req, res, next) {
  try {
    const { token } = req.body.data;
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      {
        method: "POST",
      }
    );
    return res.status(200).json({
      data: { message: "Token successfully verified" },
    });
  } catch (err) {
    return next({
      status: 500,
      message: "Error validating captcha",
    });
  }
}

async function resend(req, res, next) {
  const { phoneNumber, countryCode = "1" } = req.body.data;
  vonage.verify
    .start({
      number: formatPhoneNumber(phoneNumber, countryCode),
      brand: "China Garden",
      workflow_id: 6, // use SMS only
    })
    .then((response) => {
      if (response.status === "15") {
        return next({ status: 400, message: response.error_text });
      }
      return res
        .status(200)
        .json({ data: { request_id: response.request_id, response } });
    })
    .catch((err) => {
      return next({ status: 404, message: err });
    });
}

module.exports = {
  verify: [
    hasOnlyValidProperties(VALID_VERIFY_PROPERTIES),
    hasRequiredProperties(REQUIRED_VERIFY_PROPERTIES),
    asyncErrorBoundary(verify),
  ],
  send: [
    hasOnlyValidProperties(VALID_SEND_PROPERTIES),
    hasRequiredProperties(REQUIRED_SEND_PROPERTIES),
    asyncErrorBoundary(send),
  ],
  resend: [
    hasOnlyValidProperties(VALID_SEND_PROPERTIES),
    hasRequiredProperties(REQUIRED_SEND_PROPERTIES),
    asyncErrorBoundary(resend),
  ],
  verifyCaptcha: [
    hasOnlyValidProperties(["token"]),
    hasRequiredProperties(["token"]),
    asyncErrorBoundary(verifyCaptcha),
  ],
};
