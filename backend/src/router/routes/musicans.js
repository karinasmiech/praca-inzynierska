const router = require('express').Router();
const { Musican } = require('../../models');
const { authorize } = require('../../middlewares');

router.get('/', (req, res, next) => {
    Musican
        .find()
        .then(musicans => res.json(musicans))
        .catch(next);
});

router.post('/', authorize, (req, res, next) => {
    new Musican(req.body)
        .save()
        .then(musican => res.status(201).json(musican))
        .catch(next);
});

router.delete('/:id', authorize, (req, res, next) => {
    Musican
        .deleteOne({ _id: req.params.id })
        .then(() => res.sendStatus(204))
        .catch(next);
});

router.put('/:id', authorize, (req, res, next) => {
    Musican
        .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(musican => res.json(musican))
        .catch(next);
});

module.exports = router;
