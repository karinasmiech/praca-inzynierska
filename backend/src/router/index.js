const router = require('express').Router();
const routes = require('./routes');
const { authorize } = require('../middlewares');

router.get('/', (req, res) => res.sendStatus(200));
router.use('/auth', routes.auth);
router.use('/concerts', routes.concerts);
router.use('/account', authorize, routes.account);

module.exports = router;
