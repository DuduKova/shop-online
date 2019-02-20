const {ObjectId} = require('mongoose').Types;
const Company = require('./../models/Company');
const _ = require('lodash');

class ProductController {
    constructor() {};

    static getAll(req, res) {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        Company.findById(id , (err , company) => {
            if(err) {
                return res.status(404).send();
            }
            res.send(company.products);
        })
    };

    static getOne(req, res) {
        const id = req.params.id;
        const pid = req.params.pid;

        if (!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        Company.findById(id , (err , company) => {
            if(err) {
                return res.status(404).send();
            }

            const product = company.products.id(pid);
            if(!product) return res.status(404).send();

            res.send(product);
        })
    };

    static add(req, res) {
        const id = req.params.id;
        Company.findById(id, (err, company) => {
            if (!company) {
                return res.status(404).send();
            }

            const newProduct = {
                name: req.body.name,
                price: req.body.price,
                image: req.body.image,
                description: req.body.description
            };

            company.products.push(newProduct);

            company.save((err) => {
                if (err) return console.log(err);
                return res.send(company);
            })
        })
    };

    static update(req, res) {
        const id = req.params.id;
        const pid = req.params.pid;
        const body = _.pick(req.body, ['name', 'price', 'image','description']);

        if (!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        Company.findById(id , (err , company) => {
            if(!company) {
                return res.status(404).send();
            }

            const product = company.products.id(pid);
            if(!product) return res.status(404).send();
            product.set(body);
            company.save();
            res.send(product);
        })
    };

    static removeOne(req, res) {
        const id = req.params.id;
        const pid = req.params.pid;
        if (!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        Company.findById(id , (err , company) => {
            if(!company) {
                return res.status(404).send();
            }

            const product = company.products.id(pid);
            if(!product) return res.status(404).send();
            product.remove();
            company.save();
            res.send(company);
        })
    };
}

module.exports = ProductController;
