import axios from 'axios';
import TokenService from '@/services/token-service';
import AuthService from '@/services/auth-service';
import { types } from '@/helpers';

const authAxios = axios.create();

class ApiService {
    static get(...params) {
        return axios.get(...params);
    }

    static post(...params) {
        return axios.post(...params);
    }

    static authGet(...params) {
        return authAxios.get(...params);
    }

    static authPost(...params) {
        return authAxios.post(...params);
    }

    static authPut(...params) {
        return authAxios.put(...params);
    }

    static authDelete(...params) {
        return authAxios.delete(...params);
    }

    static requestInterceptor(config) {
        const authHeader = TokenService.getAuthHeader();

        if (authHeader) {
            config.headers.common.Authorization = authHeader;
        }

        return config;
    }

    static responseInterceptor(error) {
        const { data, status } = error.response;
        const { headers } = error.config;

        if (status === 401 && types.isObject(data) && data.error === 'invalid_token') {
            return AuthService
                .authorize()
                .then(() => {
                    headers.Authorization = TokenService.getAuthHeader();
                    return axios.request(error.config);
                })
                .catch(() => Promise.reject(error));
        }

        return Promise.reject(error);
    }
}

authAxios.interceptors.request.use(ApiService.requestInterceptor);
authAxios.interceptors.response.use(null, ApiService.responseInterceptor);

export default ApiService;
