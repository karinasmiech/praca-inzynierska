class AuthError extends Error {
    constructor(status, error, { description, headers } = {}) {
        super();
        this.status = status;

        this.response = {
            error,
        };

        if (description) {
            this.response.error_description = description;
        }

        if (headers) {
            this.headers = headers;
        }
    }
}

AuthError.INVALID_TOKEN = 'invalid_token';
AuthError.INVALID_CLIENT = 'invalid_client';
AuthError.INVALID_REQUEST = 'invalid_request';
AuthError.INVALID_GRANT = 'invalid_grant';
AuthError.UNSUPPORTED_GRANT_TYPE = 'unsupported_grant_type';

module.exports = AuthError;
