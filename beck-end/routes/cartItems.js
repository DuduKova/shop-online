const {authenticate} = require('../middleware/authenticate');
const express = require('express');
const CartItemsRouter = express.Router({mergeParams: true});

const CartItemController = require('../controllers/CartItemController');

// middleware that is specific to this router
CartItemsRouter.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();

    CartItemsRouter.get('/', (req, res) => CartItemController.getAll(req, res));

    CartItemsRouter.get('/:pid', (req, res) => CartItemController.getOne(req, res));

    CartItemsRouter.post('/add', (req, res) => CartItemController.add(req, res));

    CartItemsRouter.patch('/:pid', (req, res) => CartItemController.update(req, res));

    CartItemsRouter.delete('/remove/:pid', (req, res) => CartItemController.removeOne(req, res));
});

module.exports = CartItemsRouter;
