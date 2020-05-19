import AuthService from '@/services/auth-service';
import TokenService from '@/services/token-service';
import router from '@/router';

export default {
    signIn({ getters, commit }) {
        commit('SET_LOADING', true);

        return AuthService
            .fetchTokens(getters.credentials)
            .finally(() => commit('SET_LOADING', false));
    },
    signInErrorHandler({ commit }, error) {
        let message;

        if (error && error.isAxiosError && error.response.status === 401) {
            message = 'Niewłaściwy login lub hasło.';
        } else {
            message = 'Wystąpił błąd, spróbuj ponownie później.';
        }

        commit('SET_ERROR', message);
    },
    signOut() {
        TokenService.removeTokens();

        if (router.currentRoute.name !== 'sign-in') {
            router.push({ name: 'sign-in' });
        }
    }
};
