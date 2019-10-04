import axios from 'axios';

const CONFERENCE_API_URL = 'http://localhost:8080';
const ALL_API_URL = `${CONFERENCE_API_URL}/api`;

class RoomDataService {

    retrieveAllRooms() {
        return axios.get(`${ALL_API_URL}/rooms`);
    }

    deleteRoom(id) {
        //console.log('executed service')
        return axios.delete(`${ALL_API_URL}/rooms/${id}`);
    }

    retrieveRoom(id) {
        //console.log('executed service')
        return axios.get(`${ALL_API_URL}/rooms/${id}`);
    }

    updateRoom(id, room) {
        //console.log('executed service')
        return axios.put(`${ALL_API_URL}/rooms/${id}`, room);
    }

    createRoom(room) {
        //console.log('executed service')
        return axios.post(`${ALL_API_URL}/rooms/`, room);
    }
}

export default new RoomDataService();