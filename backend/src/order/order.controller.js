const service = require('./order.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

const hasRequiredProperties = require('../utils/hasRequiredProperties');
const hasOnlyValidProperties = require('../utils/hasOnlyValidProperties');
const REQUIRED_PROPERTIES = ['cart', 'user_id'];
const PROPERTIES = ['cart', 'user_id', 'order_id', 'created_at', 'updated_at'];

// async function list(req, res, next) {
//   const orders = await service.list();
//   res.status(200).json({ data: orders });
// }

// function orderExist(req, res, next) {
//   const text = "SELECT EXISTS (SELECT '*' FROM orders WHERE order_id = '*') AS it_does_exist"
//   // callback
//   client.query(text, (err, res) => {
//     if (err) {
//       console.log(err.stack)
//     } else {
//       console.log(res.rows[0])
//     }
//   })

//   // promise
//   client
//     .query(text)
//     .then(res => {
//       console.log(res.rows[0])
//     })
//     .catch(e => console.error(e.stack))

//   // async/await
//   try {
//     const res = await client.query(text, values)
//     console.log(res.rows[0])
//   }

//   catch (err) {
//     console.log(err.stack)
//   }

//   }

// async function read(req, res, next) {
//   // Do this
//   const orders = await service.read();
//   res.status(200).json({ data: orders });
// }
async function orderExist(req, res, next) {
  const { order_id } = req.body.data;
  if (!order_id) {
    return next({ status: 400, message: 'Order Id not found' });
  }
  const foundOrder = await service.read(order_id);
  if (foundOrder) {
    res.locals.order = foundOrder;
    return next();
  }
  return next({
    status: 404,
    message: 'Order not found',
  });
}

async function list(req, res, next) {
  res.status(200).json({ data: await service.list() });
}

function read(req, res, next) {
  res.status(200).json({ data: res.locals.order });
}

/*
 * Create Order
 */
async function create(req, res, next) {
  const { data } = req.body;
}

/*
 * Order controller
 * @returns array of middleware functions that the router can handle.
 */
module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(orderExist), read],
  create: [
    hasRequiredProperties(REQUIRED_PROPERTIES),
    hasOnlyValidProperties(PROPERTIES),

    asyncErrorBoundary(create),
  ],
  destroy: [],
};
