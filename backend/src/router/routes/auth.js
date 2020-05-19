const router = require('express').Router();
const { AuthService } = require('../../services');
const AuthModule = require('../../modules/auth-module');

router.use((req, res, next) => {
    res.set({
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache'
    });

    next();
})

router.post('/token', (req, res, next) => {
    const authModule = new AuthModule(req);

    authModule
        .authenticate()
        .then(user => res.json(AuthService.generateTokens(user)))
        .catch(next);
});

router.post('/refresh', (req, res, next) => {
    const authModule = new AuthModule(req);

    authModule
        .refreshToken()
        .then(tokens => res.json(tokens))
        .catch(next);
});

module.exports = router
