const {ObjectId} = require('mongoose').Types;
const Cart = require('./../models/Cart');
const _ = require('lodash');

class CartItemController {
    constructor() {};

    static getAll(req, res) {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        Cart.findById(id , (err , cart) => {
            if(err) {
                return res.status(404).send();
            }
            res.send(cart.items);
        })
    };

    static getOne(req, res) {
        const id = req.params.id;
        const pid = req.params.pid;

        if (!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        Cart.findById(id , (err , cart) => {
            if(err) {
                return res.status(404).send();
            }

            const cartItem = cart.items.id(pid);
            if(!cartItem) return res.status(404).send();

            res.send(cartItem);
        })
    };



    static add(req, res) {
        const id = req.params.id;
        Cart.findById(id, (err, cart) => {
            if (!cart) {
                return res.status(404).send();
            }
            const newCartItem = {
                productId: req.body.productId,
                quantity: req.body.quantity,
                // the total price that coming from the client is actully the price for one unit.
                totalPrice: req.body.totalPrice * req.body.quantity,
            };

            cart.items.push(newCartItem);

            cart.save((err) => {
                if (err) return console.log(err);
                return res.send(cart);
            })
        })
    };

    static update(req, res) {
        const id = req.params.id;
        const pid = req.params.pid;
        const body = _.pick(req.body, ['quantity']);

        if (!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        Cart.findById(id , (err , cart) => {
            if(!cart) {
                return res.status(404).send();
            }

            const cartItem = cart.items.id(pid);
            if(!cartItem) return res.status(404).send();
            cartItem.set(body);
            cart.save();
            res.send(cartItem);
        })
    };

    static removeOne(req, res) {
        const id = req.params.id;
        const pid = req.params.pid;
        if (!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        Cart.findById(id , (err , cart) => {
            if(!cart) {
                return res.status(404).send();
            }

            const cartItem = cart.items.id(pid);
            if(!cartItem) return res.status(404).send();
            cartItem.remove();
            cart.save();
            res.send(cart);
        })
    };
}

module.exports = CartItemController;
