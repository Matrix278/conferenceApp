import axios from "axios";
import * as env from "../env-variables";

// eslint-disable-next-line no-undef
const ALL_API_URL = `${env.CONFERENCE_API_URL}/api`;

class ConferenceDataService {
  retrieveAllConferences() {
    return axios.get(`${ALL_API_URL}/conferences`);
  }

  deleteConference(id) {
    return axios.delete(`${ALL_API_URL}/conferences/${id}`);
  }

  retrieveConference(id) {
    return axios.get(`${ALL_API_URL}/conferences/${id}`);
  }

  updateConference(id, conference) {
    return axios.put(`${ALL_API_URL}/conferences/${id}`, conference);
  }

  createConference(conference) {
    return axios.post(`${ALL_API_URL}/conferences/`, conference);
  }
}

export default new ConferenceDataService();
