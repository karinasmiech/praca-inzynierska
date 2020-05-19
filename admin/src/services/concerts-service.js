import ApiService from '@/services/api-service';
import config from '@/config';

class ConcertsService {
    static fetchConcerts(params) {
        return ApiService
            .authGet(`${config.apiUrl}/admin/concerts`, { params })
            .then(response => response.data);
    }

    static create(concert) {
        return ApiService
            .authPost(`${config.apiUrl}/admin/concerts`, concert)
            .then(response => response.data);
    }

    static update(concert) {
        return ApiService
            .authPut(`${config.apiUrl}/admin/concerts/${concert.id}`, concert)
            .then(response => response.data);
    }

    static delete(concertId) {
        return ApiService
            .authDelete(`${config.apiUrl}/admin/concerts/${concertId}`)
            .then(response => response.data);
    }
}

ConcertsService.formMode = {
    CREATE: 'create',
    UPDATE: 'update'
};

export default ConcertsService;
