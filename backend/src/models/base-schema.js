const { Schema } = require('mongoose');

module.exports = schema => {
    const result = new Schema(schema);

    result.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    });

    return result;
}
