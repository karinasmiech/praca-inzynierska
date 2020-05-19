const AuthModule = require('../modules/auth-module');

module.exports = (req, res, next) => {
    const authModule = new AuthModule(req);

    authModule
        .authorize()
        .then(next)
        .catch(next);
};
