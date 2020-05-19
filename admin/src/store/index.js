import Vue from 'vue';
import Vuex from 'vuex';
import actions from '@/store/actions';
import getters from '@/store/getters';
import mutations from '@/store/mutations';
import { concerts, auth } from '@/store/modules';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        snackbar: false,
        snackbarText: ''
    },
    mutations,
    actions,
    getters,
    modules: {
        concerts,
        auth
    }
});
