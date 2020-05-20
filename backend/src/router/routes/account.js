const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const httpError = require('http-errors');

router.get('/', (req, res, next) => {
    User.findOne()
        .then(user => res.json({ user }))
        .catch(next);
});

router.put('/user', (req, res, next) => {
    User
        .findOneAndUpdate(null, req.body, { new: true })
        .then(user => res.json(user))
        .catch(next);
});

router.put('/password', (req, res, next) => {
    User.findOne()
        .select('password')
        .then(user => {
            if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
                return User
                    .findOneAndUpdate(
                        null,
                        { password: bcrypt.hashSync(req.body.newPassword, 10) },
                        { new: true }
                    );
            }

            throw httpError(400, 'Invalid password');
        })
        .then((user) => res.json(user))
        .catch(next);
});

module.exports = router;
