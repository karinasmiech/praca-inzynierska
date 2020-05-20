const { AuthService } = require('../../services');
const { User } = require('../../models');
const AuthError = require('./auth-error');
const Authorization = require('./authorization');
const Credentials = require('./credentials');

class AuthModule {
    constructor(req) {
        this.req = req;
    }

    authenticate() {
        return new Promise((resolve, reject) => {
            const authorization = new Authorization(this.req.get('Authorization'));

            if (authorization.getType().toLowerCase() !== 'basic') {
                return reject(AuthService.invalidClientError('Basic'));
            }

            const credentials = new Credentials(authorization.getValue());

            User
                .findOne({ login: credentials.getUserName() })
                .select('+password')
                .then(user => {
                    if (
                        user &&
                        AuthService.isValidPassword(credentials.getPassword(), user.password)
                    ) {
                        return user;
                    }

                    throw new Error('Invalid password');
                })
                .then(user => resolve(user))
                .catch(() => reject(AuthService.invalidClientError()));
        });
    }

    authorize() {
        return new Promise((resolve, reject) => {
            const authorization = new Authorization(this.req.get('Authorization'));

            if (authorization.getType().toLowerCase() !== 'bearer') {
                return reject(AuthService.invalidClientError('Bearer'));
            }

            const invalidTokenError = new AuthError(401, AuthError.INVALID_TOKEN);

            AuthService
                .verifyToken(authorization.getValue())
                .then(token => token.typ === AuthService.tokenTypes.ACCESS)
                .then(isAccessToken => isAccessToken ? resolve() : reject(invalidTokenError))
                .catch(() => reject(invalidTokenError));
        });
    }

    refreshToken() {
        return new Promise((resolve, reject) => {
            const grantType = this.req.body.grant_type;
            const refreshToken = this.req.body.refresh_token;

            if (grantType !== 'refresh_token') {
                return reject(new AuthError(400, AuthError.UNSUPPORTED_GRANT_TYPE));
            }

            const invalidGrantError = new AuthError(400, AuthError.INVALID_GRANT);

            if (!refreshToken) {
                return reject(invalidGrantError);
            }

            AuthService
                .verifyToken(refreshToken)
                .then(token => {
                    if (token.typ === AuthService.tokenTypes.REFRESH) {
                        return User.findById({ _id: token.sub })
                    }

                    throw invalidGrantError;
                })
                .then(user => {
                    user ? resolve(AuthService.generateTokens(user)) : reject(invalidGrantError);
                })
                .catch(() => reject(invalidGrantError));
        })
    }
}

module.exports = AuthModule;
