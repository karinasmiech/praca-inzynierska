import jwt from 'jsonwebtoken';

class TokenService {
    static setTokens(tokens) {
        localStorage.setItem(TokenService.STORAGE_KEY, JSON.stringify(tokens));
        return tokens;
    }

    static getTokens() {
        let tokens;

        try {
            tokens = JSON.parse(localStorage.getItem(TokenService.STORAGE_KEY));
        } catch (e) {
            tokens = null;
        }

        return tokens;
    }

    static removeTokens() {
        localStorage.removeItem(TokenService.STORAGE_KEY);
    }

    static isValidAccessToken(token) {
        return token ? TokenService.isValidToken(token, 'Bearer') : false;
    }

    static isValidRefreshToken(token) {
        return token ? TokenService.isValidToken(token, 'Refresh') : false;
    }

    static isValidToken(token, tokenType) {
        const decodedToken = jwt.decode(token);

        if (!decodedToken || decodedToken.typ !== tokenType) {
            return false;
        }

        return decodedToken.exp * 1000 > Date.now();
    }

    static getAccessToken() {
        const tokens = TokenService.getTokens();
        return tokens ? tokens[TokenService.ACCESS_TOKEN] : '';
    }

    static getRefreshToken() {
        const tokens = TokenService.getTokens();
        return tokens ? tokens[TokenService.REFRESH_TOKEN] : '';
    }

    static getAuthHeader() {
        const accessToken = TokenService.getAccessToken();

        return accessToken ? `Bearer ${accessToken}` : '';
    }
}

TokenService.STORAGE_KEY = 'tokens';
TokenService.ACCESS_TOKEN = 'access_token';
TokenService.REFRESH_TOKEN = 'refresh_token';

export default TokenService;
