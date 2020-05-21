import axios from 'axios';

const apiUrl = process.env.VUE_APP_API_URL;

export default class ApiService {
    static fetchConcerts() {
        return axios.get(`${apiUrl}/concerts`)
            .then(response => response.data);
    }

    static fetchMusicans() {
        return axios.get(`${apiUrl}/musicans`)
            .then(response => response.data);
    }
}
