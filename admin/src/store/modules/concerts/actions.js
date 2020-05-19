import ConcertsService from '@/services/concerts-service';
import Concert from '@/models/concert';

export default {
    showCreateForm({ commit }) {
        commit('SET_MODE', ConcertsService.formMode.CREATE);
        commit('SET_EDIT', new Concert());
        commit('SET_DIALOG', true);
    },
    showUpdateForm({ commit }, concert) {
        commit('SET_MODE', ConcertsService.formMode.UPDATE);
        commit('SET_EDIT', Object.assign({}, concert));
        commit('SET_DIALOG', true);
    },
    handleTableOptionsUpdate({ commit, dispatch, getters }, options) {
        const { page, itemsPerPage, sort } = getters;
        let fetchConcerts = false;

        if (sort.prop !== options.sortBy[0] || sort.desc !== options.sortDesc[0]) {
            fetchConcerts = true;
            commit('SET_SORT', {
                prop: options.sortBy[0],
                desc: options.sortDesc[0]
            });
        }

        if (page !== options.page) {
            fetchConcerts = true;
            commit('SET_PAGE', options.page);
        }

        if (itemsPerPage !== options.itemsPerPage) {
            fetchConcerts = true;
            commit('SET_ITEMS_PER_PAGE', options.itemsPerPage);
        }

        if (fetchConcerts) {
            dispatch('fetchConcerts');
        }
    },
    fetchConcerts({ commit, getters, dispatch }) {
        const { sort, itemsPerPage, page } = getters;
        const params = {
            limit: itemsPerPage,
            page,
        };

        if (sort.prop) {
            params.sort =`${sort.desc ? '-' : ''}${sort.prop}`;
        }

        commit('SET_LOADING', true);

        return ConcertsService
            .fetchConcerts(params)
            .then(concerts => commit('SET_CONCERTS_DATA', concerts))
            .catch(error => dispatch('handleError', error, { root: true }))
            .finally(() => commit('SET_LOADING', false));
    },
    createConcert({ commit, getters, dispatch }) {
        return ConcertsService
            .create(getters.edit)
            .then(() => {
                dispatch('fetchConcerts');
                dispatch('showSnackbar', 'Koncert został dodany', { root: true });
            })
            .catch(error => dispatch('handleError', error, { root: true }))
            .finally(() => commit('SET_DIALOG', false));
    },
    updateConcert({ commit, getters, dispatch }) {
        return ConcertsService
            .update(getters.edit)
            .then(() => {
                dispatch('fetchConcerts');
                dispatch('showSnackbar', 'Koncert został zaktualizowany', { root: true });
            })
            .catch(error => dispatch('handleError', error, { root: true }))
            .finally(() => commit('SET_DIALOG', false));
    },
    deleteConcert({ commit, dispatch }, concertId) {
        return ConcertsService
            .delete(concertId)
            .then(() => {
                dispatch('fetchConcerts');
                dispatch('showSnackbar', 'Koncert został usunięty', { root: true });
            })
            .catch(error => dispatch('handleError', error, { root: true }));
    }
};
