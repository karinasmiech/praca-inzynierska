const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AuthError = require('../modules/auth-module/auth-error');
const config = require('../config');

class AuthService {
    static invalidClientError(authorizationType) {
        const params = {};

        if (authorizationType) {
            params.headers = {
                'WWW-Authenticate': authorizationType
            }
        }

        return new AuthError(401, AuthError.INVALID_CLIENT, params);
    }

    static isValidPassword(user, password) {
        if (user && bcrypt.compareSync(password, user.password)) {
            return user;
        }

        throw new Error();
    }

    static generateTokens(user) {
        return {
            access_token: AuthService.generateAccessToken(user),
            refresh_token: AuthService.generateRefreshToken(user),
            token_type: 'Bearer'
        };
    }

    static generateAccessToken(user) {
        const payload = {
            sub: user._id,
            rol: user.role,
            typ: AuthService.tokenTypes.ACCESS
        };

        return jwt.sign(payload, config.tokenSecret, {
            expiresIn: config.accessTokenExpiration
        });
    }

    static generateRefreshToken(user) {
        const payload = {
            sub: user._id,
            rol: user.role,
            typ: AuthService.tokenTypes.REFRESH
        };

        return jwt.sign(payload, config.tokenSecret, {
            expiresIn: config.refreshTokenExpiration
        });
    }

    static verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.tokenSecret, (error, token) => {
                error ? reject() : resolve(token);
            });
        });
    }
}

AuthService.tokenTypes = {
    ACCESS: 'Bearer',
    REFRESH: 'Refresh'
}

module.exports = AuthService;
