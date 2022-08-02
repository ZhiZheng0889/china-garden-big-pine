const router = require('express').Router();
const controller = require('./orderitem.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/').get(controller.list).all(methodNotAllowed);

app.post('/cart/update', (req, res) => {
    let ids = req.body["product_id[]"];
    let qtys = req.body["qty[]"];
    if(Security.isValidNonce(req.body.nonce, req)) {
        Cart.updateCart(ids, qtys);
        Cart.saveCart(req);
        res.redirect('/cart');
    } else {
        res.redirect('/');
    }
    });

module.exports = router;