const router = require('express').Router();
const { authorize } = require('../../middlewares');
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

router.get('/admin', authorize, (req, res, next) => {
    const options = getPaginateOptions(req);

    Concert
        .paginate(null, options)
        .then(concerts => res.json(concerts))
        .catch(next);
});

router.post('/', authorize, (req, res, next) => {
    new Concert(req.body)
        .save()
        .then(concert => res.status(201).json(concert))
        .catch(next);
});

router.delete('/:id', authorize, (req, res, next) => {
    Concert
        .deleteOne({ _id: req.params.id })
        .then(() => res.sendStatus(204))
        .catch(next);
});

router.put('/:id', authorize, (req, res, next) => {
    Concert
        .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(concert => res.json(concert))
        .catch(next);
});

module.exports = router;
