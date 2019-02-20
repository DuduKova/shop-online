const express = require('express');
const productsRouter = express.Router({mergeParams: true});

const productController = require('../controllers/ProductController');

// middleware that is specific to this router
productsRouter.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();

    productsRouter.get('/', (req, res) => productController.getAll(req, res));

    productsRouter.get('/:pid', (req, res) => productController.getOne(req, res));

    productsRouter.post('/add', (req, res) => productController.add(req, res));

    productsRouter.patch('/:pid', (req, res) => productController.update(req, res));

    productsRouter.delete('/remove/:pid', (req, res) => productController.removeOne(req, res));
});

module.exports = productsRouter;
