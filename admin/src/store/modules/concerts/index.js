import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import config from '@/config';
import Concert from '@/models/concert';

export default {
    namespaced: true,
    actions,
    mutations,
    getters,
    state: {
        concertsData: {},
        loading: true,
        dialog: false,
        mode: null,
        edit: new Concert(),
        page: 1,
        itemsPerPage: config.itemsPerPage,
        sort: config.sort
    }
};
