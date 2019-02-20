const mongoose = require('../db/mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const ProductSchema = require('./Product');

const CompanySchema = new Schema({
    name: {type: String, required: true , unique: true , lowercase: true},
    bio: {type: String, required: true },
    logo: {type: String, required: true},
    products: [ProductSchema]
});

CompanySchema.plugin(uniqueValidator, {message: 'is already taken.'});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;
