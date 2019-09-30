import React from 'react';

export default class ConferenceRoomForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            location: '',
            maxSeats: '',
            nameError: '',
            locationError: '',
            maxSeatsError: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);   
        this.handleNameChange = this.handleNameChange.bind(this);
        this.validateName = this.validateName.bind(this);

        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.validateLocation = this.validateLocation.bind(this);

        this.handleMaxSeatsChange = this.handleMaxSeatsChange.bind(this);
        this.validateMaxSeats = this.validateMaxSeats.bind(this);
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value }, () => {
            this.validateName();
        });
    };

    validateName() {
        const { name } = this.state;
        this.setState({
            nameError: name.length > 3 ? "" : 'Room name must be longer than 3 characters'
        });
    }

    handleLocationChange(event) {
        this.setState({ location: event.target.value }, () => {
            this.validateLocation();
        });
    };

    validateLocation() {
        const { location } = this.state;
        this.setState({
            locationError: location.length > 3 ? "" : 'Location must be longer than 3 characters'
        });
    }

    handleMaxSeatsChange(event) {
        let { value, min, max } = event.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        this.setState({
                maxSeats: value
            },
            () => {
            this.validateMaxSeats();
        });
    };

    validateMaxSeats() {
        const { maxSeats } = this.state;
        this.setState({
            maxSeatsError: maxSeats !== "" ? "" : 'Maximum seats cant be empty'
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        // console.log("Name: " + this.state.name);
        // console.log(this.state.nameError);
        // console.log(this.state.locationError);
        // console.log(this.state.maxSeatsError);
        if(this.state.name !== "" && this.state.location !== "" && this.state.maxSeats !== ""){
            if(this.state.nameError === "" && this.state.locationError === "" && this.state.maxSeatsError === "") {
                let newRoom = {
                    name: this.state.name,
                    location: this.state.location,
                    maxSeats: this.state.maxSeats
                };
                this.props.createRoom(newRoom);
            }
        }
    }

    render(){
        const { name, location, maxSeats, nameError, locationError, maxSeatsError } = this.state;
        const isEnabled = name !== "" && location !== "" && maxSeats !== "" && nameError === "" && locationError === "" && maxSeatsError === "";
        return (
            <div>
                <div className="h4">Create new room</div>
                <form>
                    <div className="form-group row">
                        <label htmlFor="example-text-input2" className="col-2 col-form-label">Room name</label>
                        <div className="col-10">
                            <input className={`form-control ${this.state.nameError ? 'is-invalid' : ''}`} type="text" name="name" placeholder="M/S Baltic Queen conference" id="example-text-input2" value={this.state.name} onChange={this.handleNameChange} onBlur={this.validateName}/>
                            <div className='invalid-feedback'>{this.state.nameError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="example-text-input3" className="col-2 col-form-label">Location</label>
                        <div className="col-10">
                            <input className={`form-control ${this.state.locationError ? 'is-invalid' : ''}`} type="text" name="location" placeholder="M/S Baltic Queen" id="example-text-input3" value={this.state.location} onChange={this.handleLocationChange} onBlur={this.validateLocation}/>
                            <div className='invalid-feedback'>{this.state.locationError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="example-text-input4" className="col-2 col-form-label">Maximum seats</label>
                        <div className="col-10">
                            <input className={`form-control ${this.state.maxSeatsError ? 'is-invalid' : ''}`} type="number" name="maxSeats" placeholder="100" min="1" max="124" id="example-text-input4" value={this.state.maxSeats} onChange={this.handleMaxSeatsChange} onBlur={this.validateMaxSeats}/>
                            <div className='invalid-feedback'>{this.state.maxSeatsError}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={!isEnabled} className="btn btn-success" onClick={this.handleSubmit}>Create room</button>
                    </div>        
                </form>
            </div>
        );
    }
}