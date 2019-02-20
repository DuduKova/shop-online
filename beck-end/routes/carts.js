const {authenticate} = require('../middleware/authenticate');

const express = require('express');
const cartsRouter = express.Router();
const cartItemsRouter = require('./cartItems');
const cartController = require('../controllers/CartController');

// middleware that is specific to this router

cartsRouter.use('/:id/cartitems', cartItemsRouter);

cartsRouter.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();

    cartsRouter.get('/', (req, res) => cartController.getAll(req, res));

    cartsRouter.get('/:id',  (req, res) => cartController.getOne(req, res));

    cartsRouter.post('/add',  (req, res) => cartController.add(req, res));

    cartsRouter.patch('/:id', (req, res) => cartController.update(req, res));

    cartsRouter.delete('/remove/:id', (req, res) => cartController.removeOne(req, res));
});

module.exports = cartsRouter;
