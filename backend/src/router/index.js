const router = require('express').Router();
const routes = require('./routes');
const { authorize } = require('../middlewares');

router.get('/', (req, res) => res.sendStatus(200));
router.use('/concerts', routes.concerts);
router.use('/admin', authorize, routes.admin);
router.use('/auth', routes.auth);
router.get('/env', (req, res) => res.send(process.env.NODE_ENV));

module.exports = router;
