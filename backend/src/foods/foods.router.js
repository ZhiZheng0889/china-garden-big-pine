const router = require("express").Router();
const controller = require("./foods.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);

<<<<<<< HEAD
=======
// app.get('/foods', async (req, res) => {
//     const category = req.query.category;
//     const foods = await getFoodsByCategory(category);

//     if (category && !foods.length) {
//       res.status(404).json({ error: `Category: ${category} does not exist` });
//     } else {
//       res.status(200).json({ data: foods });
//     }
//   });

>>>>>>> 015e24878581b54dd13cfe5e29570a30a0af7b46
module.exports = router;
