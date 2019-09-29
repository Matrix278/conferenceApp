import React from 'react';
import ConferenceForm from './ConferenceForm';
import ConferenceTable from './ConferenceTable';
import ConferenceDataService from './../service/ConferenceDataService';
import RoomDataService from "../service/RoomDataService";
import ParticipantDataService from "../service/ParticipantDataService";

export default class Conference extends React.Component {
	constructor(props) {
      super(props);
      this.deleteConference = this.deleteConference.bind(this);
      this.createConference = this.createConference.bind(this);
      this.state = {
          conferences: [],
		  loadedRooms: [],
		  loadedParticipants: []
      };
	}
	
	componentDidMount() {
		this.loadConferencesFromServer();
		this.loadAllRoomIds();
		this.loadAllParticipantIds();
	}

	loadAllRoomIds() {
		RoomDataService.retrieveAllRooms()
		.then(
			response => {
				// console.log(response);
				this.setState({ loadedRooms: response.data })
			}
		)
	}

	loadAllParticipantIds() {
		ParticipantDataService.retrieveAllParticipants()
			.then(
				response => {
					// console.log(response);
					this.setState({ loadedParticipants: response.data })
				}
			)
	}
	  
	// Load conferences from database
	loadConferencesFromServer() {
		ConferenceDataService.retrieveAllConferences()
		.then(
			response => {
				// console.log(response);
				this.setState({ conferences: response.data })
			}
		)
	}

	// Delete conference
	deleteConference(id) { 
		ConferenceDataService.deleteConference(id)
		.then(
			response => {
				this.loadConferencesFromServer()
			}
		)
	}

	// Create new conference
	createConference(conference) {
		ConferenceDataService.createConference(conference)
		.then(
			response => {
				this.loadConferencesFromServer()
			}
		)
	}

	render() {
        return (
			<>
				<ConferenceForm createConference={this.createConference} conferences={this.state.conferences} loadedRooms={this.state.loadedRooms} loadedParticipants={this.state.loadedParticipants}/>
          		<ConferenceTable deleteConference={this.deleteConference} conferences={this.state.conferences}/>
			</>
        )
    }

}