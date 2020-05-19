class Authorization {
    constructor(authorization) {
        this.authorization = authorization || '';
    }

    getType() {
        return this.authorization.split(' ')[0];
    }

    getValue() {
        return this.authorization.split(' ')[1] || '';
    }
}

module.exports = Authorization;
