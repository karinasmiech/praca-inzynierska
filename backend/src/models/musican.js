const { model } = require('mongoose');
const baseSchema = require('./base-schema');

const musicanSchema = baseSchema({
    name: String,
    instrument: String,
    photoUrl: String,
    description: String
});

module.exports = model('Musican', musicanSchema);
