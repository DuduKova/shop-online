const {ObjectId} = require('mongoose').Types;
const Order = require('./../models/Order');
const _ = require('lodash');

class OrderController {
    constructor () {};

    static getOne (req, res) {
        let id = req.params.id;

        if(!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        Order.findById(id).then((order) => {
            if(!order) {
                return res.status(404).send();
            }
            res.send(order);
        }).catch((e) => {
            res.status(400).send(e);
        });
    };

    static getAll (req , res) {
        Order.find({}, (err , order) => {
            if(err) {
                return res.send(err);
            }
            return res.send(order);
        })
    };

    static add (req , res) {
        console.log(req.body);
        const newOrder = new Order({
            cartId: req.body.cartId,
            totalPrice: req.body.totalPrice,
            city: req.body.city,
            street: req.body.street,
            dateToDeliver: req.body.dateToDeliver,
            dateOfOrder: req.body.dateOfOrder,
            creditCard4digit: req.body.creditCard4digit
        });

        newOrder.save(function (err) {
            if (err) return res.status(400).send(err);
            return res.send('new order was created');
        })
    };

    static update (req , res) {
        const id = req.params.id;
        const body = _.pick(req.body , ['logo','bio']);

        if(!ObjectId.isValid(id)) {
            return res.status(404).send();
        }
        Order.findOneAndUpdate(id, {
            $set: body
        }, {new: true}).then((order) => {
            if(!order) {
                res.status(404).send();
            }

            res.send({order});

        }).catch((e) => {
            res.status(404).send(e);
        })
    };

    static removeOne (req,res) {
        let id = req.params.id;
        if(!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        Order.findByIdAndRemove(id).then((order) => {
            if(!order) {
                return res.status(404).send();
            }
            res.send(order);
        }).catch((e) => {
            res.status(400).send(e);
        });
    };
}

module.exports = OrderController;
