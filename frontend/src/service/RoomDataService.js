import axios from "axios";

// eslint-disable-next-line no-undef
const ALL_API_URL = `${CONFERENCE_API_URL}/api`;

class RoomDataService {
  retrieveAllRooms() {
    return axios.get(`${ALL_API_URL}/rooms`);
  }

  deleteRoom(id) {
    return axios.delete(`${ALL_API_URL}/rooms/${id}`);
  }

  retrieveRoom(id) {
    return axios.get(`${ALL_API_URL}/rooms/${id}`);
  }

  updateRoom(id, room) {
    return axios.put(`${ALL_API_URL}/rooms/${id}`, room);
  }

  createRoom(room) {
    return axios.post(`${ALL_API_URL}/rooms/`, room);
  }
}

export default new RoomDataService();
