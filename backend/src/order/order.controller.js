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

<<<<<<< HEAD
  // async/await
  try {
    const res = client.query(text, values)
    console.log(res.rows[0])
  } 
  
  catch (err) {
    console.log(err.stack)
  }
    
  }
=======
//   const text = "SELECT EXISTS (SELECT '*' FROM orders WHERE order_id = '*') AS it_does_exist"
//   // callback
//   client.query(text, (err, res) => {
//     if (err) {
//       console.log(err.stack)
//     } else {
//       console.log(res.rows[0])
//     }
//   })
>>>>>>> e7152ada1ba916b9b2bd99990edfda23e34e58d4

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

// /*
//  * Order controller
//  * @returns array of middleware functions that the router can handle.
//  */
// module.exports = {
//   list: [asyncErrorBoundary(list)],
//   read: [orderExist, asyncErrorBoundary(read)],
//   create: [
//     hasRequiredProperties(REQUIRED_PROPERTIES),
//     hasOnlyValidProperties(PROPERTIES),
//   ],
//   destroy: [],
// };
