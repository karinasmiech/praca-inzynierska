export default class User {
    constructor(props) {
        const user = props || {};

        this.id = user.id || null;
        this.name = user.name || '';
        this.login = user.login || '';
    }
}
