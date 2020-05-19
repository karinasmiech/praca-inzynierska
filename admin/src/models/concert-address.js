export default class ConcertAddress {
    constructor(props) {
        const address = props || {};

        this.route = address.route || '';
        this.streetNumber = address.streetNumber || '';
        this.postalCode = address.postalCode || '';
        this.locality = address.locality || '';
        this.country = address.country || '';
    }
}
