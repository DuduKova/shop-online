const mongoose = require('../db/mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const Cart = require('./Cart');
// const User = require('./User');

const OrderSchema = new Schema({
    cartId: {type: Schema.Types.ObjectId, ref: 'Cart', required: true , unique: true},
    // userId: {type: Schema.Types.ObjectId, ref: 'User', required: true , unique: true},
    totalPrice: {type: Number, required: true },
    city: {type: String, required: true , lowercase: true},
    street: {type: String , required: true , lowercase: true},
    dateToDeliver: {type: String, required: true },
    dateOfOrder: {type: String, required: true},
    creditCard4digit: {type: String, required: true }
});

OrderSchema.plugin(uniqueValidator, {message: 'is already taken.'});

Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
