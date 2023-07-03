const service = require("./order.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasRequiredProperties = require("../utils/hasRequiredProperties");
const isValidPhoneNumber = require("../utils/isValidPhoneNumber");
const MAX_COMMENT_LENGTH = parseInt(process.env.MAX_COMMENT_LENGTH);
const REQUIRED_PROPERTIES = ["name", "phoneNumber", "comment"];

async function getOrderById(req, res, next) {}

async function getOrderByPhoneNumber(req, res, next) {}

async function createOrder(req, res, next) {}

function hasValidPhoneNumber(req, res, next) {
  const { phoneNumber } = req.body.data;
  if (isValidPhoneNumber(phoneNumber)) {
    return next();
  }
  return next({
    status: 400,
    message: `Phone number: ${phoneNumber} is invalid`,
  });
}

function hasValidComment(req, res, next) {
  const { comment } = req.body.data;
  if (comment.length > MAX_COMMENT_LENGTH) {
    return next({
      status: 400,
      message: "Comment exceeds the max length",
    });
  }
  return next();
}

module.exports = {
  getOrderByPhoneNumber: [],
  getOrderById: [],
  createOrder: [
    hasRequiredProperties(REQUIRED_PROPERTIES),
    hasValidPhoneNumber,
    hasValidComment,
    asyncErrorBoundary(createOrder),
  ],
};
