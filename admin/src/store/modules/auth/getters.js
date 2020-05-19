export default {
    username: state => state.username,
    password: state => state.password,
    error: state => state.error,
    valid: state => state.valid,
    showPassword: state => state.showPassword,
    loading: state => state.loading,
    credentials: state => {
        const { username, password } = state;

        return { username, password };
    }
};
