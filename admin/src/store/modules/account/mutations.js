export default {
    SET_USER(state, payload) {
        state.user = payload;
    },

    SET_EDIT(state, payload) {
        state.edit = payload;
    },

    SET_PASSWORDS(state, payload) {
        state.passwords = payload;
    },

    SET_LOADING_USER(state, payload) {
        state.loadingUser = payload;
    },

    SET_LOADING_PASSWORDS(state, payload) {
        state.loadingPasswords = payload;
    }
};
