export default {
    concerts: state => state.concertsData.data || [],
    totalConcerts: state => state.concertsData.totalElements,
    loading: state => state.loading,
    dialog: state => state.dialog,
    mode: state => state.mode,
    edit: state => state.edit,
    page: state => state.page,
    itemsPerPage: state => state.itemsPerPage,
    sort: state => state.sort
};
