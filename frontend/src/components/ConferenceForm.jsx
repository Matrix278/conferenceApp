import React from 'react';

export default class ConferenceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomId: '',
            name: '',
            dateTime: '',
            roomIdError: '',
            nameError: '',
            dateTimeError: '',
            countedParticipants: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRoomIdChange = this.handleRoomIdChange.bind(this);
        this.validateRoomId = this.validateRoomId.bind(this);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.validateName = this.validateName.bind(this);

        this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
        this.validateDateTime = this.validateDateTime.bind(this);
    }

    handleRoomIdChange(event) {
        this.setState({ roomId: event.target.value }, () => {
            this.validateRoomId();
        });
    };

    validateRoomId() {
        const { roomId } = this.state;
        this.setState({
            roomIdError: roomId.length !== "" ? "" : 'Room ID must be selected'
        });
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value }, () => {
            this.validateName();
        });
    };

    validateName() {
        const { name } = this.state;
        this.setState({
            nameError: name.trim().length > 3 ? "" : 'Conference name must be longer than 3 characters'
        });
    }

    handleDateTimeChange(event) {
        this.setState({ dateTime: event.target.value }, () => {
            this.validateDateTime();
        });
    };

    validateDateTime() {
        const { dateTime } = this.state;
        this.setState({
            dateTimeError: dateTime !== "" ? "" : 'Date and time must be entered'
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        // console.log(this.state.roomIdError);
        // console.log(this.state.nameError);
        // console.log(this.state.dateTimeError);
        if(this.state.roomId !== "" && this.state.name !== "" && this.state.dateTime !== ""){
            if(this.state.roomIdError === "" && this.state.nameError === "" && this.state.dateTimeError === "") {
                let newConference = {
                    roomId: this.state.roomId,
                    name: this.state.name,
                    dateTime: this.state.dateTime
                };
                this.props.createConference(newConference);
            }
        }
    }
    
    render() {
        const { roomId, name, dateTime, roomIdError, nameError, dateTimeError } = this.state;
        const isEnabled = roomId !== "" && name !== "" && dateTime !== "" && roomIdError === "" && nameError === "" && dateTimeError === "";
        return (
            <div>
                <div className="h4">Create new conference</div>
                <form>
                    <div className="form-group row">
                        <label htmlFor="roomSelectBox" className="col-2 col-form-label">Room ID</label>
                        <div className="col-10">
                            <select name="roomId" id="roomSelectBox" className={`form-control ${this.state.roomIdError ? 'is-invalid' : ''}`} onChange={this.handleRoomIdChange} onBlur={this.validateRoomId}>
                            <option value="">Select an option</option>
                            {
                                this.props.loadedRooms.map(loadedRoom => {
                                        let confRoomID = this.props.conferences.filter(oneConference => oneConference.roomId);
                                        for(let j = 0; j <= confRoomID.length-1; j++) {
                                            // console.log("ROOM_ID_IN_CONFERENCE: " + confRoomID[j].roomId);
                                            // console.log("ROOM_ID: " + loadedRoom.id);
                                            // console.log(" ");
                                            if (confRoomID[j] !== undefined) {
                                                if (confRoomID[j].roomId === loadedRoom.id) {
                                                        for(let i = 0; i < this.props.conferences.length; i++) {
                                                            for(let k = 0; k < this.props.loadedParticipants.length; k++) {
                                                                // console.log(this.props.loadedParticipants.length);
                                                                let confFilter = this.props.conferences.filter(conference => conference.id === this.props.loadedParticipants[k].conferenceId);
                                                                // console.log("LoadedParticipants_CONF_ID: " + this.props.loadedParticipants[k].conferenceId);
                                                                // console.log(this.props.conferences.filter(conference => conference.id)[i].id);
                                                                if (confFilter[i] !== undefined) {
                                                                    // console.log("Participant_conferenceID: " + this.props.loadedParticipants[i].conferenceId);
                                                                    // console.log("CONFFILTER: " + this.props.conferences.filter(conference => conference.id)[i].id);
                                                                    if (this.props.loadedParticipants[k].conferenceId === confFilter[i].id) {
                                                                        let resultParticipants = this.props.loadedParticipants.filter(participant => participant.conferenceId === this.props.conferences.map(conference => conference.id)[k]);//[i]
                                                                        console.log("Participant: " + this.props.loadedParticipants.filter(participant => participant.conferenceId)[k].conferenceId);
                                                                        console.log("Conference: " + this.props.conferences.map(conference => conference.id)[k]);
                                                                        this.state.countedParticipants = resultParticipants.length;
                                                                        // console.log("Filter Result length: " + resultParticipants.length);
                                                                        console.log("STATE COUNTED_PARTICIPANTS: " + this.state.countedParticipants);
                                                                    }
                                                                }
                                                            }
                                                    }//FOR END
                                                }
                                            }
                                        }//FOR END
                                    console.log("Counted Participants in one conference: " + this.state.countedParticipants);
                                    let availableSeats = loadedRoom.maxSeats - this.state.countedParticipants;
                                    return <option key={loadedRoom.id} value={loadedRoom.id}>{loadedRoom.id} - {loadedRoom.name}, Location: {loadedRoom.location} (Max seats: {loadedRoom.maxSeats}, Available seats: {availableSeats})</option>;
                                }//loadedRoom MAP END
                                )
                            }
                            </select>
                            <div id="invalid-roomId" className='invalid-feedback'>{this.state.roomIdError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="example-text-input" className="col-2 col-form-label">Conference name</label>
                        <div className="col-10">
                            <input className={`form-control ${this.state.nameError ? 'is-invalid' : ''}`} type="text" name="name" placeholder="Baltic" maxLength="150" id="example-text-input" value={this.state.name} onChange={this.handleNameChange} onBlur={this.validateName}/>
                            <div id="invalid-name" className='invalid-feedback'>{this.state.nameError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="example-datetime-local-input" className="col-2 col-form-label">Date and time</label>
                        <div className="col-10">
                            <input className={`form-control ${this.state.dateTimeError ? 'is-invalid' : ''}`} type="datetime-local" name="dateTime" min="2019-09-31T00:00" max="2999-12-31T00:00" id="example-datetime-local-input" value={this.state.dateTime} onChange={this.handleDateTimeChange} onBlur={this.validateDateTime}/>
                            <div id="invalid-dateTime" className='invalid-feedback'>{this.state.dateTimeError}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={!isEnabled} className="btn btn-success" onClick={this.handleSubmit}>Create conference</button>
                    </div>        
                </form>
            </div>
        );
    }
}