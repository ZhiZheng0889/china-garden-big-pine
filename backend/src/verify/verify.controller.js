const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const hasOnlyValidProperties = require('../utils/hasOnlyValidProperties');
const hasRequiredProperties = require('../utils/hasRequiredProperties');
const service = require('./verify.service');
const { Vonage } = require('@vonage/server-sdk');
const { VONAGE_KEY, VONAGE_SECRET } = process.env;
const vonage = new Vonage(
  {
    apiKey: VONAGE_KEY,
    apiSecret: VONAGE_SECRET,
  },
  {
    debug: process.env.NODE_ENV === 'development',
  }
);

const VALID_VERIFY_PROPERTIES = ['request_id', 'code'];
const REQUIRED_VERIFY_PROPERTIES = ['request_id', 'code'];
const VALID_SEND_PROPERTIES = ['phone_number'];
const REQUIRED_SEND_PROPERTIES = ['phone_number'];
function verify(req, res, next) {
  const { request_id, code } = req.body.data;
  vonage.verify
    .check(request_id, code)
    .then((response) => {
      console.log(response);
      return res.status(200).json({ data: response });
    })
    .catch((err) => {
      console.log(err);
      return next({ status: 404, message: err.error_text });
    });
}

function send(req, res, next) {
  const { phone_number: number } = req.body.data;
  vonage.verify
    .start({
      number,
      brand: 'China Garden',
    })
    .then((response) => {
      return res
        .status(200)
        .json({ data: { request_id: response.request_id, response } });
    })
    .catch((err) => {
      console.log(err);
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
};
