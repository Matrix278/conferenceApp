import React from 'react';

export default class ParticipantForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            conferenceId: '',
            fullName: '',
            birthDate: '',
            conferenceIdError: '',
            fullNameError: '',
            birthDateError: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConferenceIdChange = this.handleConferenceIdChange.bind(this);
        this.validateConferenceId = this.validateConferenceId.bind(this);

        this.handleFullNameChange = this.handleFullNameChange.bind(this);
        this.validateFullName = this.validateFullName.bind(this);

        this.handleBirthDateChange = this.handleBirthDateChange.bind(this);
        this.validateBirthDate = this.validateBirthDate.bind(this);
    }

    handleConferenceIdChange(event) {
        this.setState({ conferenceId: event.target.value }, () => {
            this.validateConferenceId();
        });
    };

    validateConferenceId() {
        const { conferenceId } = this.state;
        this.setState({
            conferenceIdError: conferenceId.length !== "" ? "" : 'Conference ID must be selected'
        });
    }

    handleFullNameChange(event) {
        this.setState({ fullName: event.target.value }, () => {
            this.validateFullName();
        });
    };

    validateFullName() {
        const { fullName } = this.state;
        this.setState({
            fullNameError: fullName.length > 3 ? "" : 'Full name must be longer than 3 characters'
        });
    }

    handleBirthDateChange(event) {
        this.setState({
                birthDate: event.target.value
            },
            () => {
                this.validateBirthDate();
            });
    };

    validateBirthDate() {
        const { birthDate } = this.state;
        this.setState({
            birthDateError: birthDate !== "" ? "" : 'Birth date must be entered'
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        // console.log("Name: " + this.state.name);
        // console.log(this.state.conferenceIdError);
        // console.log(this.state.fullNameError);
        // console.log(this.state.birthDateError);
        if(this.state.conferenceId !== "" && this.state.fullName !== "" && this.state.birthDate !== ""){
            if(this.state.conferenceIdError === "" && this.state.fullNameError === "" && this.state.birthDateError === "") {
                let newParticipant = {
                    conferenceId: this.state.conferenceId,
                    fullName: this.state.fullName,
                    birthDate: this.state.birthDate
                };
                this.props.createParticipant(newParticipant);
            }
        }
    }

    render(){
        const { conferenceId, fullName, birthDate, conferenceIdError, fullNameError, birthDateError } = this.state;
        const isEnabled = conferenceId !== "" && fullName !== "" && birthDate !== "" && conferenceIdError === "" && fullNameError === "" && birthDateError === "";
        return (
            <div>
                <div className="h4">Add new participant</div>
                <form>
                    <div className="form-group row">
                        <label htmlFor="example-text-input" className="col-2 col-form-label">Conference ID</label>
                        <div className="col-10">
                            <select name="conferenceId" id="example-text-input" className={`form-control ${this.state.conferenceIdError ? 'is-invalid' : ''}`} onChange={this.handleConferenceIdChange} onBlur={this.validateConferenceId}>
                            <option value="">Select an option</option>
                                {
                                    this.props.loadedConferences.map(
                                        loadedConference =>
                                        <option key={loadedConference.id} value={loadedConference.id}>{loadedConference.id} - {loadedConference.name} ({loadedConference.dateTime})</option>
                                    )
                                }
                            </select>
                            <div className='invalid-feedback'>{this.state.conferenceIdError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="example-text-input2" className="col-2 col-form-label">Person full name</label>
                        <div className="col-10">
                            <input className={`form-control ${this.state.fullNameError ? 'is-invalid' : ''}`} type="text" name="fullName" placeholder="Aleksandr Reit" id="example-text-input2" value={this.state.fullName} onChange={this.handleFullNameChange} onBlur={this.validateFullName}/>
                            <div className='invalid-feedback'>{this.state.fullNameError}</div>
                        </div>
                    </div>
					<div className="form-group row">
						<label htmlFor="example-date-input" className="col-2 col-form-label">Date of birth</label>
						<div className="col-10">
							<input className={`form-control ${this.state.birthDateError ? 'is-invalid' : ''}`} type="date" name="birthDate" id="example-date-input" value={this.state.birthDate} onChange={this.handleBirthDateChange} onBlur={this.validateBirthDate}/>
                            <div className='invalid-feedback'>{this.state.birthDateError}</div>
						</div>
					</div>
                    <div className="form-group">
                        <button disabled={!isEnabled} className="btn btn-success" onClick={this.handleSubmit}>Add participant</button>
                    </div>        
                </form>
            </div>
        );
    }
}