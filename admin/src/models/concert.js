import ConcertAddress from '@/models/concert-address';

export default class Concert {
    constructor(props) {
        const concert = props || {};

        this.date = concert.date || null;
        this.publish = concert.publish || false;
        this.ticketPrice = concert.ticketPrice || '';
        this.clubName = concert.clubName || '';
        this.address = new ConcertAddress(concert.address);
    }
}
