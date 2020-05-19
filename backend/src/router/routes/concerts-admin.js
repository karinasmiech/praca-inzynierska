const router = require('express').Router();
const { Concert } = require('../../models');
const { getPaginateOptions } = require('../../helpers');

router.get('/', (req, res, next) => {
    const options = getPaginateOptions(req);

    Concert
        .paginate(null, options)
        .then(concerts => res.json(concerts))
        .catch(next);
});

router.get('/:id', (req, res, next) => {
    Concert
        .findById(req.params.id)
        .then(concert => res.json(concert))
        .catch(next);
});

router.post('/', (req, res, next) => {
    new Concert(req.body)
        .save()
        .then(concert => res.status(201).json(concert))
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    Concert
        .deleteOne({ _id: req.params.id })
        .then(() => res.sendStatus(204))
        .catch(next);
});

router.put('/:id', (req, res, next) => {
    Concert
        .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(concert => res.json(concert))
        .catch(next);
});

module.exports = router;
