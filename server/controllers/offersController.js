const Offer = require('../models/offer');

module.exports = {
    async findAll(req, res) {
        const offers = await Offer.find({});
        return res.status(200).send({ data: offers });
    },

    async create(req, res) {
        const offer = await new Offer({
            logo: req.body.logo,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        }).save();

        return res.status(201).send({ data: offer, message: 'Offer was created!'});
    },
    
    async update(req, res, next) {
        const offer = await Offer.findOne({ '_id': req.params.id });
        if(!offer) return next();

        offer.logo = req.body.logo;

        await offer.save();

        return res.status(200).send({ data: offer, message: 'Offer was updated'})
    },
    
    async remove(req, res, next) {
        const offer = await Offer.findOne({ '_id': req.params.id });
        if(!offer) return next();

        await offer.remove();

        return res.status(200).send({ data: offer, message: 'Offer succesfully removed!' });
    },
}