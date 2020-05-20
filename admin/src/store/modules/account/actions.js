import AccountService from '@/services/account-service';
import User from '@/models/user';

export default {
    fetchData({ commit }) {
        return AccountService
            .fetchData()
            .then(accountData => {
                commit('SET_USER', new User(accountData.user));
            })
            .catch(error => {
                console.dir(error);
            })
    },

    updateUser({ commit, getters, dispatch }) {
        commit('SET_LOADING_USER', true);
        return AccountService
            .updateUser(getters.edit)
            .then(user => {
                commit('SET_USER', new User(user));
                commit('SET_EDIT', null);
                dispatch('showSnackbar', 'Dane użytkownika zostały zaktualizowane', { root: true });
            })
            .catch(() => dispatch('showSnackbar', 'Wystąpił błąd', { root: true }))
            .finally(() => commit('SET_LOADING_USER', false));
    },

    updatePassword({ getters, commit, dispatch }) {
        const { newPassword, oldPassword } = getters.passwords;
        const passwords = {
            newPassword,
            oldPassword
        };

        commit('SET_LOADING_PASSWORDS', true);

        return AccountService
            .updatePassword(passwords)
            .then(() => {
                commit('SET_PASSWORDS', null);
                dispatch('showSnackbar', 'Zmieniono hasło', { root: true });
            })
            .catch(() => dispatch('showSnackbar', 'Stare hasło jest niewłaściwe', { root: true }))
            .finally(() => commit('SET_LOADING_PASSWORDS', false));
    }
};
