import ApiService from '@/services/api-service';
import config from '@/config';

class MusicansService {
    static fetchMusicans() {
        return ApiService
            .get(`${config.apiUrl}/musicans`)
            .then(response => response.data);
    }

    static create(musican) {
        return ApiService
            .authPost(`${config.apiUrl}/musicans`, musican)
            .then(response => response.data);
    }

    static update(musican) {
        return ApiService
            .authPut(`${config.apiUrl}/musicans/${musican.id}`, musican)
            .then(response => response.data);
    }

    static delete(musicanId) {
        return ApiService
            .authDelete(`${config.apiUrl}/musicans/${musicanId}`)
            .then(response => response.data);
    }
}

MusicansService.formMode = {
    CREATE: 'create',
    UPDATE: 'update'
};

export default MusicansService;
