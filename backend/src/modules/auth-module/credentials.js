const { Base64 } = require('js-base64');

class Credentials {
    constructor(credentials) {
        this.credentials = Base64.decode(credentials || '');
    }

    getUserName() {
        return this.credentials.split(':')[0] || '';
    }

    getPassword() {
        return this.credentials.split(':')[1] || '';
    }
}

module.exports = Credentials;
