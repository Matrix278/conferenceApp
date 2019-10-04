import axios from 'axios';

const CONFERENCE_API_URL = 'http://localhost:8080';
const ALL_API_URL = `${CONFERENCE_API_URL}/api`;

class ConferenceDataService {

    retrieveAllConferences() {
        return axios.get(`${ALL_API_URL}/conferences`);
    }

    deleteConference(id) {
        //console.log('executed service')
        return axios.delete(`${ALL_API_URL}/conferences/${id}`);
    }

    retrieveConference(id) {
        //console.log('executed service')
        return axios.get(`${ALL_API_URL}/conferences/${id}`);
    }

    updateConference(id, conference) {
        //console.log('executed service')
        return axios.put(`${ALL_API_URL}/conferences/${id}`, conference);
    }

    createConference(conference) {
        //console.log('executed service')
        return axios.post(`${ALL_API_URL}/conferences/`, conference);
    }
}

export default new ConferenceDataService();