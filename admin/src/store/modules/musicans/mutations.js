export default {
    SET_MUSICANS(state, payload) {
        state.musicans = payload;
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
    }
};
