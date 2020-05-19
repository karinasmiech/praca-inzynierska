import { Base64 } from 'js-base64';
import ApiService from '@/services/api-service';
import TokenService from '@/services/token-service';
import config from '@/config';

export default class AuthService {
    static fetchTokens({ username, password }) {
        const headers = {
            Authorization: `Basic ${Base64.encode(`${username}:${password}`)}`
        };

        return ApiService
            .post(`${config.apiUrl}/auth/token`, null, { headers })
            .then(response => TokenService.setTokens(response.data));
    }

    static refreshToken() {
        const refreshToken = TokenService.getRefreshToken();

        if (!TokenService.isValidRefreshToken(refreshToken)) {
            TokenService.removeTokens();
            return Promise.reject();
        }

        const data = {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        };

        return ApiService
            .post(`${config.apiUrl}/auth/refresh`, data)
            .then(response => TokenService.setTokens(response.data))
            .catch(error => {
                TokenService.removeTokens();
                throw error;
            });
    }

    static authorize() {
        return new Promise((resolve, reject) => {
            const tokens = TokenService.getTokens();

            if (!tokens) {
                return reject();
            }

            const accessToken = tokens[TokenService.ACCESS_TOKEN];

            if (TokenService.isValidAccessToken(accessToken)) {
                return resolve();
            }

            AuthService
                .refreshToken()
                .then(() => resolve())
                .catch(() => reject());
        });
    }
}
