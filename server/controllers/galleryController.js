const Photo = require('../models/photo');
const filePublic = require('../config/filePublic');
const fs = require('fs');

module.exports = {
    async findAll(req, res) {
        const photo = await Photo.find({});
        return res.status(200).send({ data: photo});
    },
    async create(req, res) {
        const photo = await new Photo({
            img: req.file.filename,
            title: req.body.title,
            description: req.body.description,
        });

        await photo.save();

        return res.status(201).send({ data: photo, file: req.file });
    },
    async updateAll(req, res, next) {
        const photo = await Photo.findOne({ '_id': req.params.id });

        if(!photo) return next();

        let error = {};

        await fs.unlink(`${filePublic.relative}/gallery/${photo.img}`, (err) => {
            if (err) {
                error.status = '404';
                error.message = err;
            } else {
                error.status = '201';
                error.message = 'Everything ok!';
            }
        });

        if(error.status === '404') return res.status(404).send({message: error.message});

        if(req.body['img-name']) photo.img = req.file.filename;
        if(req.body.title) photo.title = req.body.title;
        if(req.body.description) photo.description = req.body.description;

        await photo.save();

        return res.status(201).send({ data: photo, message: 'Img was sent!'});
    },
    async updateOne(req, res, next) {
        const photo = await Photo.findOne({ '_id': req.params.id });

        if(!photo) return next();

        if(req.body.title) photo.title = req.body.title;
        if(req.body.description) photo.description = req.body.description;

        await photo.save();

        return res.status(201).send({ data: photo, message: 'Photo was updated! '});
    },
    async remove(req, res, next) {
        const photo = await Photo.findOne({ '_id': req.params.id });

        if(!photo) return next();

        let error = {};

        await fs.unlink(`${filePublic.relative}/gallery/${photo.img}`, (err) => {
            if (err) {
                error.status = '404';
                error.message = err;
            } else {
                error.status = '201';
                error.message = 'Everything ok!';
            }
        });

        if(error.status === '404') return res.status(404).send({message: error.message});

        await photo.delete();

        return res.status(200).send({ data: photo, message: 'Photo was deleted & File removed!'});
    },
};
