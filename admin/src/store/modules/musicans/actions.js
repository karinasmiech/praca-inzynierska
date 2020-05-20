import MusicansService from '@/services/musicans-service';
import Musican from '@/models/musican';

export default {
    showCreateForm({ commit }) {
        commit('SET_MODE', MusicansService.formMode.CREATE);
        commit('SET_EDIT', new Musican());
        commit('SET_DIALOG', true);
    },
    showUpdateForm({ commit }, musican) {
        commit('SET_MODE', MusicansService.formMode.UPDATE);
        commit('SET_EDIT', Object.assign({}, musican));
        commit('SET_DIALOG', true);
    },
    fetchMusicans({ commit, dispatch }) {
        return MusicansService
            .fetchMusicans()
            .then(musicans => commit('SET_MUSICANS', musicans))
            .catch(() => {
                dispatch('showSnackbar', 'Błąd pobierania składu zespołu', { root: true });
            });
    },

    createMusican({ getters, dispatch, commit }) {
        commit('SET_LOADING', true);

        return MusicansService
            .create(getters.edit)
            .then(() => dispatch('fetchMusicans'))
            .then(() => dispatch('showSnackbar', 'Dodano muzyka do zespołu', { root: true }))
            .catch(() => dispatch('showSnackbar', 'Wystąpił błąd', { root: true }))
            .finally(() => {
                commit('SET_LOADING', false);
                commit('SET_DIALOG', false);
            });
    },

    updateMusican({ getters, dispatch, commit }) {
        commit('SET_LOADING', true);

        return MusicansService
            .update(getters.edit)
            .then(() => dispatch('fetchMusicans'))
            .then(() => dispatch('showSnackbar', 'Zaktualizowano muzyka z zespołu', { root: true }))
            .catch(() => dispatch('showSnackbar', 'Wystąpił błąd', { root: true }))
            .finally(() => {
                commit('SET_LOADING', false)
                commit('SET_DIALOG', false);
            });
    },

    deleteMusican({ dispatch, commit }, id) {
        commit('SET_LOADING', true);

        return MusicansService
            .delete(id)
            .then(() => dispatch('fetchMusicans'))
            .then(() => dispatch('showSnackbar', 'Usunięto muzyka z zespołu', { root: true }))
            .catch(() => dispatch('showSnackbar', 'Wystąpił błąd', { root: true }))
            .finally(() => commit('SET_LOADING', false));
    }
};
