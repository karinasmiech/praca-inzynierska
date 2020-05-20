export default class Musican {
    constructor(payload) {
        const musican = payload || {};

        this.name = musican.name || '';
        this.description = musican.description || '';
        this.instrument = musican.instrument || '';
        this.photoUrl = musican.photoUrl || '';
    }
}
