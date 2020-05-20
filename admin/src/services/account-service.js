import ApiService from '@/services/api-service';
import config from '@/config';

class AccountService {
    static fetchData() {
        return ApiService
            .authGet(`${config.apiUrl}/account`)
            .then(response => response.data);
    }

    static updateUser(user) {
        return ApiService
            .authPut(`${config.apiUrl}/account/user`, user)
            .then(response => response.data);
    }

    static updatePassword(passwords) {
        return ApiService
            .authPut(`${config.apiUrl}/account/password`, passwords)
            .then(response => response.data);
    }
}

export default AccountService;
