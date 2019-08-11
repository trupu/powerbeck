const Coach = require('../models/coach');

module.exports = {
    async findAll(req, res) {
        const coaches = await Coach.find({});
        return res.status(200).send({ data: coaches });
    },
    async create(req, res) {
        const coach = await new Coach({
            img: req.body.img,
            position: req.body.position,
            quotation: req.body.quotation,
            description: req.body.description,
        }).save();

        return res.status(201).send({ data: coach, message: 'Coach was created!'});
    },
    async update() {

    },
    async remove(req, res, next) {
        const coach = await Coach.findOne({ '_id': req.params.id });
        if(!coach) return next();

        await coach.remove();

        return res.status(200).send({ data: coach, message: 'Coach was deleted!'});
    },
};