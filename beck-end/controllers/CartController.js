const {ObjectId} = require('mongoose').Types;
const Cart = require('./../models/Cart');
const _ = require('lodash');

class CartController {
    constructor () {};

    static getOne (req, res) {
        Cart.find({
            userId: req.params.id,
        }).then((result) => {
            if(!result) {
                return res.status(404).send();
            }
            res.send(result[0]);
        }).catch((e) => {
            res.status(400).send(e);
        });
    };

    static getAll (req , res) {
        console.log('get all');
        Cart.find({}, (err , cart) => {
            if(err) {
                return res.send(err);
            }
            return res.send(cart);
        })
    };

    static add (req , res) {
        console.log('add cart wotks');
        const newCart = new Cart({
            userId: req.body.id,
        });

        newCart.save(function (err) {
            if (err) return console.log(err);
            return res.send('new cart was created');
        })
    };

    static update (req , res) {
        const id = req.params.id;

        if(!ObjectId.isValid(id)) {
            return res.status(404).send();
        }
        Cart.findOneAndUpdate(id, {
            $set: body
        }, {new: true}).then((cart) => {
            if(!cart) {
                res.status(404).send();
            }

            res.send({cart});

        }).catch((e) => {
            res.status(404).send(e);
        })
    };

    static removeOne (req,res) {
        let id = req.params.id;
        if(!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        Cart.findByIdAndRemove(id).then((result) => {
            if(!result) {
                return res.status(404).send();
            }
            res.send(null);
        }).catch((e) => {
            res.status(400).send(e);
        });
    };
}

module.exports = CartController;
