import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import User from '@/models/user';

export default {
    namespaced: true,
    actions,
    mutations,
    getters,
    state: {
        user: new User(),
        edit: null,
        passwords: null,
        loadingUser: false,
        loadingPasswords: false
    }
};
