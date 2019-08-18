const Coach = require('../models/coach');
const filePublic = require('../config/filePublic');
const fs = require('fs');

module.exports = {
    async findAll(req, res) {
        const coaches = await Coach.find({});
        return res.status(200).send({ data: coaches });
    },
    async create(req, res) {
        const coach = await new Coach({
            img: req.body['img-name'],
            name: req.body.name,
            quotation: req.body.quotation,
            description: req.body.description,
        }).save();

        const file = req.file;

        return res.status(201).send({ data: {coach, file}, message: 'Coach was created & File was uploaded!'});
    },
    async updateAll(req, res, next) {
        const coach = await Coach.findOne({ '_id': req.params.id });

        if(!coach) return next();

        let error = {};

        await fs.unlink(`${filePublic.relative}/${coach.img}`, (err) => {
            if (err) {
                error.status = '404';
                error.message = err;
            } else {
                error.status = '201';
                error.message = 'Everything ok!';
            }
        });

        if(error.status === '404') return res.status(404).send({message: error.message});

        if(req.body['img-name']) coach.img = req.body['img-name'];
        if(req.body.name) coach.name = req.body.name;
        if(req.body.description) coach.description = req.body.description;
        if(req.body.quotation) coach.quotation = req.body.quotation;

        await coach.save();

        return res.status(200).send({ data: coach, message: 'Coach was updated'});
    },
    async updateOne(req, res, next) {
        const coach = await Coach.findOne({ '_id': req.params.id });

        if(!coach) return next();

        if(req.body['img-name']) coach.img = req.body['img-name'];
        if(req.body.name) coach.name = req.body.name;
        if(req.body.description) coach.description = req.body.description;
        if(req.body.quotation) coach.quotation = req.body.quotation;

        await coach.save();

        return res.status(200).send({ data: coach, message: 'Coach was updated'});
    },
    async remove(req, res, next) {
        const coach = await Coach.findOne({ '_id': req.params.id });
        if(!coach) return next();

        let error = {};

        await fs.unlink(`${filePublic.relative}/${coach.img}`, (err) => {
            if (err) {
                error.status = '404';
                error.message = err;
            } else {
                error.status = '201';
                error.message = 'Everything ok!';
            }
        });

        if(error.status === '404') return res.status(404).send({message: error.message});

        await coach.remove();

        return res.status(200).send({ data: coach, message: 'Coach was deleted & File removed!'});
    },
};