const {authenticate} = require('../middleware/authenticate');
const express = require('express');
const ordersRouter = express.Router();
const orderController = require('../controllers/OrderController');

// middleware that is specific to this router
ordersRouter.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();

    ordersRouter.get('/', (req, res) => orderController.getAll(req, res));

    ordersRouter.get('/:id', (req, res) => orderController.getOne(req, res));

    ordersRouter.post('/add', (req, res) => orderController.add(req, res));

    ordersRouter.patch('/:id', (req, res) => orderController.update(req, res));

    ordersRouter.delete('/remove/:id', (req, res) => orderController.removeOne(req, res));
});

module.exports = ordersRouter;
