import React from 'react';
import ParticipantForm from './ParticipantForm';
import ParticipantTable from './ParticipantTable';
import ParticipantDataService from './../service/ParticipantDataService';
import ConferenceDataService from "../service/ConferenceDataService";

export default class Participant extends React.Component {
	constructor(props) {
      super(props);
      this.deleteParticipant = this.deleteParticipant.bind(this);
      this.createParticipant = this.createParticipant.bind(this);
      this.state = {
		  participants: [],
		  loadedConferences: []
      };
	}
	
	componentDidMount() {
		this.loadParticipantsFromServer();
		this.loadAllConferenceIds();
	}

	loadAllConferenceIds() {
		ConferenceDataService.retrieveAllConferences()
		.then(
			response => {
				// console.log(response);
				this.setState({ loadedConferences: response.data })
			}
		)
	}
	  
	// Load conferences from database
	loadParticipantsFromServer() {
		ParticipantDataService.retrieveAllParticipants()//HARDCODED
		.then(
			response => {
				// console.log(response);
				this.setState({ participants: response.data })
			}
		)
	}

	// Delete conference
	deleteParticipant(id) { 
		ParticipantDataService.deleteParticipant(id)
		.then(
			response => {
				this.loadParticipantsFromServer()
			}
		)
	}

	// Create new conference
	createParticipant(participant) {
		ParticipantDataService.createParticipant(participant)
		.then(
			response => {
				this.loadParticipantsFromServer()
			}
		)
	}

	render() {
        return (
			<>
				<ParticipantForm createParticipant={this.createParticipant} loadedConferences={this.state.loadedConferences}/>
          		<ParticipantTable deleteParticipant={this.deleteParticipant} participants={this.state.participants}/>
			</>
        )
    }

}