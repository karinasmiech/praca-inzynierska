const mongoosePaginate = require('mongoose-paginate-v2');
const { defaultPageLimit } = require('../config');

mongoosePaginate.paginate.options = {
    limit: defaultPageLimit,
    customLabels: {
        totalDocs: 'totalElements',
        docs: 'data'
    }
};

module.exports = mongoosePaginate;
