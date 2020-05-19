export default {
    SET_CONCERTS_DATA(state, payload) {
        state.concertsData = payload || {};
    },
    SET_LOADING(state, payload) {
        state.loading = payload;
    },
    SET_DIALOG(state, payload) {
        state.dialog = payload;
    },
    SET_MODE(state, payload) {
        state.mode = payload;
    },
    SET_EDIT(state, payload) {
        state.edit = payload;
    },
    SET_PAGE(state, payload) {
        state.page = payload;
    },
    SET_ITEMS_PER_PAGE(state, payload) {
        state.itemsPerPage = payload;
    },
    SET_SORT(state, payload) {
        state.sort = payload;
    }
};
