const mongoose = require('../db/mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const CartItem = require('./CartItem');
const User = require('./User');

const CartSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    items: [CartItem]
});

CartSchema.plugin(uniqueValidator, {message: 'is already taken.'});

Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;


