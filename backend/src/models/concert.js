const { Schema, model } = require('mongoose');
const baseSchema = require('./base-schema');
const { pagination } = require('../plugins');

const addressSchema = new Schema({
    route: String,
    streetNumber: String,
    postalCode: String,
    locality: String,
    country: String
}, { _id: false });

const concertSchema = baseSchema({
    address: {
        type: addressSchema,
        default: {}
    },
    date: String,
    publish: Boolean,
    ticketPrice: String,
    clubName: String
});

concertSchema.plugin(pagination);

module.exports = model('Concert', concertSchema);
