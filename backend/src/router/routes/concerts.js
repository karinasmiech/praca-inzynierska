const router = require('express').Router();
const { Concert } = require('../../models');
const { getPaginateOptions } = require('../../helpers');

router.get('/', (req, res, next) => {
    const options = getPaginateOptions(req);

    options.sort = {
        date: -1
    };

    options.select = '-publish';

    Concert
        .paginate({ publish: true }, options)
        .then(concerts => res.json(concerts))
        .catch(next);
});

module.exports = router;
