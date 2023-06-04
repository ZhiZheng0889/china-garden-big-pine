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
      const updatedUser = await service.verifyPhoneNumber(user_id);
      delete updatedUser.password;
      return res.status(200).json({
        data: {
          updatedUser,
          response,
        },
      });
    }
    return res.status(200).json({ data: response });
  } catch (error) {
    return next({ status: 404, message: err.error_text });
  }
}

function send(req, res, next) {
  const { phoneNumber, countryCode = "1" } = req.body.data;
  vonage.verify
    .start({
      number: formatPhoneNumber(phoneNumber, countryCode),
      brand: "China Garden",
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

// async function sendSMS(req, res, next) {
//   const from = "12013508387";
//   const to = "17275454718";
//   const text = "A text message sent using the Vonage SMS API";

//   try {
//     const response = await vonage.sms.send({ to, from, text });
//     res.status(200).json({ data: response });
//   } catch (err) {
//     console.error("There was an error sending the message.");
//     console.error(err);
//     return next({ status: 400, message: err.message });
//   }
// }

// function sendSMSHandler(req, res, next) {
//   try {
//     sendSMS(req, res, next);
//   } catch (error) {
//     console.error(error);
//     return next({ status: 400, message: error.message });
//   }
// }

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

// async function sendSMS(req, res, next) {
//   try {
//     const { phoneNumber } = req.body.data;
//     const from = "China Garden";
//     const to = phoneNumber;
//     const text = `Your China Garden verification code: 1234. The code expires in 3 minutes.`;
//     const response = await vonage.sms.send({ to, from, text });
//     console.log("RES: ", response);
//     res.status(200).json({ data: response });
//   } catch (error) {
//     console.error(error);
//     return next({ status: 400, message: error.message });
//   }
// }

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

  sendSMS: [
    hasOnlyValidProperties(VALID_SEND_PROPERTIES),
    hasRequiredProperties(REQUIRED_SEND_PROPERTIES),
    // asyncErrorBoundary(sendSMS),
  ],

  verifySMS: [
    hasOnlyValidProperties(VALID_VERIFY_PROPERTIES),
    hasRequiredProperties(REQUIRED_VERIFY_PROPERTIES),
  ],
  verifyCaptcha: [
    hasOnlyValidProperties(["token"]),
    hasRequiredProperties(["token"]),
    asyncErrorBoundary(verifyCaptcha),
  ],
};
