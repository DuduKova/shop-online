const {ObjectId} = require('mongoose').Types;
const Company = require('./../models/Company');
const _ = require('lodash');

class CompanyController {
    constructor () {};

    static getOne (req, res) {
        let id = req.params.id;

        if(!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        Company.findById(id).then((result) => {
            if(!result) {
                return res.status(404).send();
            }
            res.send(result);
        }).catch((e) => {
            res.status(400).send(e);
        });
    };

    static getAll (req , res) {
        Company.find({}, (err , company) => {
            if(err) {
                return res.send(err);
            }
            return res.send(company);
        })
    };

    static add (req , res) {
        const newCompany = new Company({
            name: req.body.name,
            bio: req.body.bio,
            logo: req.body.logo
        });

        newCompany.save(function (err) {
            if (err) return console.log(err);
            return res.send('new company was created');
        })
    };

    static update (req , res) {
        const id = req.params.id;
        const body = _.pick(req.body , ['logo','bio']);

        if(!ObjectId.isValid(id)) {
            return res.status(404).send();
        }
        Company.findOneAndUpdate(id, {
            $set: body
        }, {new: true}).then((company) => {
            if(!company) {
                res.status(404).send();
            }

            res.send({company});

        }).catch((e) => {
            res.status(404).send(e);
        })
    };

    static removeOne (req,res) {
        let id = req.params.id;
        if(!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        Company.findByIdAndRemove(id).then((result) => {
            if(!result) {
                return res.status(404).send();
            }
            res.send(result);
        }).catch((e) => {
            res.status(400).send(e);
        });
    };
}

module.exports = CompanyController;
