const express = require('express');
const companiesRouter = express.Router();
const productsRouter = require('./products');
const companyController = require('../controllers/CompanyController');

// middleware that is specific to this router

companiesRouter.use('/:id/products', productsRouter);

companiesRouter.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();

    companiesRouter.get('/', (req, res) => companyController.getAll(req, res));

    companiesRouter.get('/:id', (req, res) => companyController.getOne(req, res));

    companiesRouter.post('/add', (req, res) => companyController.add(req, res));

    companiesRouter.patch('/:id', (req, res) => companyController.update(req, res));

    companiesRouter.delete('/remove/:id', (req, res) => companyController.removeOne(req, res));
});

module.exports = companiesRouter;
