const router = require('express').Router();
const routes = require('./');

router.use('/concerts', routes.concertsAdmin);
router.use('/users', routes.usersAdmin);

module.exports = router;
