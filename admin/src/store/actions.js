import router from '@/router';

export default {
    showSnackbar({ commit }, text) {
        commit('SET_SNACKBAR', true);
        commit('SET_SNACKBAR_TEXT', text);
    },
    handleError({ dispatch }, error) {
        if (error && error.isAxiosError && error.response.status === 401) {
            router.push({ name: 'sign-in' });
        }
    }
};
