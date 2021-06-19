import React from "react";
import ConferenceForm from "./ConferenceForm";
import ConferenceTable from "./ConferenceTable";
import ConferenceDataService from "../../service/ConferenceDataService";

export default class Conference extends React.Component {
  constructor(props) {
    super(props);
    this.deleteConference = this.deleteConference.bind(this);
    this.createConference = this.createConference.bind(this);
    this.state = {
      conferences: [],
    };
  }

  componentDidMount() {
    this.loadConferencesFromServer();
  }

  // Load conferences from database
  loadConferencesFromServer() {
    ConferenceDataService.retrieveAllConferences().then((response) => {
      this.setState({ conferences: response.data });
    });
  }

  // Delete conference
  deleteConference(id) {
    ConferenceDataService.deleteConference(id).then((response) => {
      this.loadConferencesFromServer();
    });
  }

  // Create new conference
  createConference(conference) {
    ConferenceDataService.createConference(conference).then((response) => {
      this.loadConferencesFromServer();
    });
  }

  render() {
    return (
      <>
        <ConferenceForm createConference={this.createConference} />
        <ConferenceTable
          deleteConference={this.deleteConference}
          conferences={this.state.conferences}
        />
      </>
    );
  }
}
