export default {
    SET_VALID(state, payload) {
        state.valid = payload;
    },
    SET_USERNAME(state, payload) {
        state.username = payload;
    },
    SET_PASSWORD(state, payload) {
        state.password = payload;
    },
    SET_ERROR(state, payload) {
        state.error = payload;
    },
    SET_PASSWORD_VISIBILITY(state, payload) {
        state.showPassword = payload;
    },
    SET_LOADING(state, payload) {
        state.loading = payload;
    }
};
