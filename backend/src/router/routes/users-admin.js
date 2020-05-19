const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res, next) => {
    User.find()
        .then(users => res.json(users))
        .catch(next);
});

router.get('/:id', (req, res, next) => {
    User
        .findById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
});

router.post('/', (req, res, next) => {
    new User(req.body)
        .save()
        .then(concert => res.status(201).json(concert))
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    User
        .deleteOne({ _id: req.params.id })
        .then(() => res.sendStatus(204))
        .catch(next);
});

router.put('/:id', (req, res, next) => {
    User
        .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(concert => res.json(concert))
        .catch(next);
});

module.exports = router;
