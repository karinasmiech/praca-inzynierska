module.exports = req => {
    const { page, limit, sort } = req.query;

    const options = {
        page: page > 0 ? page : 1
    };

    if (limit) {
        options.limit = limit;
    }

    if (sort) {
        options.sort = sort;
    }

    return options;
};
