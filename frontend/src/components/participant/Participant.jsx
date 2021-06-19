import React from "react";
import ParticipantForm from "./ParticipantForm";
import ParticipantTable from "./ParticipantTable";
import ParticipantDataService from "../../service/ParticipantDataService";
import ConferenceDataService from "../../service/ConferenceDataService";

export default class Participant extends React.Component {
  constructor(props) {
    super(props);
    this.deleteParticipant = this.deleteParticipant.bind(this);
    this.createParticipant = this.createParticipant.bind(this);
    this.loadAllConferences = this.loadAllConferences.bind(this);
    this.state = {
      participants: [],
      loadedConferences: [],
    };
  }

  componentDidMount() {
    this.loadParticipantsFromServer();
    this.loadAllConferences();
  }

  loadAllConferences() {
    ConferenceDataService.retrieveAllConferences().then((response) => {
      this.setState({ loadedConferences: response.data });
    });
  }

  // Load participants from database
  loadParticipantsFromServer() {
    ParticipantDataService.retrieveAllParticipants() //HARDCODED
      .then((response) => {
        this.setState({ participants: response.data });
      });
  }

  // Delete participant
  deleteParticipant(id) {
    ParticipantDataService.deleteParticipant(id).then((response) => {
      this.loadParticipantsFromServer();
      this.loadAllConferences();
    });
  }

  // Create new participant
  createParticipant(participant, loadAllConferences) {
    ParticipantDataService.createParticipant(participant).then((response) => {
      this.loadParticipantsFromServer();
      loadAllConferences();
    });
  }

  render() {
    return (
      <>
        <ParticipantForm
          createParticipant={this.createParticipant}
          loadedConferences={this.state.loadedConferences}
          loadAllConferences={this.loadAllConferences}
        />
        <ParticipantTable
          deleteParticipant={this.deleteParticipant}
          participants={this.state.participants}
        />
      </>
    );
  }
}
