import axios from 'axios';

const CONFERENCE_API_URL = 'http://localhost:8080';
const ALL_API_URL = `${CONFERENCE_API_URL}/api`;

class ParticipantDataService {

    retrieveAllParticipants() {
        return axios.get(`${ALL_API_URL}/participants`);
    }

    deleteParticipant(id) {
        //console.log('executed service')
        return axios.delete(`${ALL_API_URL}/participants/${id}`);
    }

    retrieveParticipant(id) {
        //console.log('executed service')
        return axios.get(`${ALL_API_URL}/participants/${id}`);
    }

    updateParticipant(id, participant) {
        //console.log('executed service')
        return axios.put(`${ALL_API_URL}/participants/${id}`, participant);
    }

    createParticipant(participant) {
        //console.log('executed service')
        return axios.post(`${ALL_API_URL}/participants/`, participant);
    }
}

export default new ParticipantDataService();