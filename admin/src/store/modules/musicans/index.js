import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import Musican from '@/models/musican';

export default {
    namespaced: true,
    actions,
    mutations,
    getters,
    state: {
        musicans: [],
        loading: false,
        dialog: false,
        mode: null,
        edit: new Musican()
    }
};
