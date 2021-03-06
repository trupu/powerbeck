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

        if (req.body.logo) offer.logo = req.body.logo;
        if (req.body.name) offer.name = req.body.name;
        if (req.body.description) offer.description = req.body.description;
        if (req.body.price) offer.price = req.body.price;

        await offer.save();

        return res.status(200).send({ data: offer, message: 'Offer was updated'});
    },
    
    async remove(req, res, next) {
        const offer = await Offer.findOne({ '_id': req.params.id });
        if(!offer) return next();

        await offer.remove();

        return res.status(200).send({ data: offer, message: 'Offer succesfully removed!' });
    },
}