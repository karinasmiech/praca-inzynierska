import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
    namespaced: true,
    actions,
    mutations,
    getters,
    state: {
        loading: false,
        valid: false,
        showPassword: false,
        username: '',
        password: '',
        error: ''
    }
};
