import axios from "axios";

// eslint-disable-next-line no-undef
const ALL_API_URL = `${CONFERENCE_API_URL}/api`;

class ParticipantDataService {
  retrieveAllParticipants() {
    return axios.get(`${ALL_API_URL}/participants`);
  }

  deleteParticipant(id) {
    return axios.delete(`${ALL_API_URL}/participants/${id}`);
  }

  retrieveParticipant(id) {
    return axios.get(`${ALL_API_URL}/participants/${id}`);
  }

  updateParticipant(id, participant) {
    return axios.put(`${ALL_API_URL}/participants/${id}`, participant);
  }

  createParticipant(participant) {
    return axios.post(`${ALL_API_URL}/participants/`, participant);
  }
}

export default new ParticipantDataService();
