import React from "react";
import RoomDataService from "../../service/RoomDataService";

export default class ConferenceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: "",
      name: "",
      dateTime: "",
      roomIdError: "",
      nameError: "",
      dateTimeError: "",
      loadedRooms: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRoomIdChange = this.handleRoomIdChange.bind(this);
    this.validateRoomId = this.validateRoomId.bind(this);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.validateName = this.validateName.bind(this);

    this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
    this.validateDateTime = this.validateDateTime.bind(this);
  }

  componentDidMount() {
    this.loadAllRooms();
  }

  loadAllRooms() {
    RoomDataService.retrieveAllRooms().then((response) => {
      this.setState({ loadedRooms: response.data });
    });
  }

  handleRoomIdChange(event) {
    this.setState({ roomId: event.target.value }, () => {
      this.validateRoomId();
    });
  }

  validateRoomId() {
    const { roomId } = this.state;
    this.setState({
      roomIdError: roomId.length !== "" ? "" : "Room ID must be selected",
    });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value }, () => {
      this.validateName();
    });
  }

  validateName() {
    const { name } = this.state;
    this.setState({
      nameError:
        name.trim().length > 3
          ? ""
          : "Conference name must be longer than 3 characters",
    });
  }

  handleDateTimeChange(event) {
    this.setState({ dateTime: event.target.value }, () => {
      this.validateDateTime();
    });
  }

  validateDateTime() {
    const { dateTime } = this.state;
    this.setState({
      dateTimeError: dateTime !== "" ? "" : "Date and time must be entered",
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (
      this.state.roomId !== "" &&
      this.state.name !== "" &&
      this.state.dateTime !== ""
    ) {
      if (
        this.state.roomIdError === "" &&
        this.state.nameError === "" &&
        this.state.dateTimeError === ""
      ) {
        let newConference = {
          roomId: this.state.roomId,
          name: this.state.name,
          dateTime: this.state.dateTime,
        };
        this.props.createConference(newConference);
      }
    }
  }

  render() {
    const { roomId, name, dateTime, roomIdError, nameError, dateTimeError } =
      this.state;
    const isEnabled =
      roomId !== "" &&
      name !== "" &&
      dateTime !== "" &&
      roomIdError === "" &&
      nameError === "" &&
      dateTimeError === "";
    return (
      <div>
        <div className="h4">Create new conference</div>
        <form>
          <div className="form-group row">
            <label htmlFor="roomSelectBox" className="col-2 col-form-label">
              Room ID
            </label>
            <div className="col-10">
              <select
                name="roomId"
                id="roomSelectBox"
                className={`form-control ${
                  this.state.roomIdError ? "is-invalid" : ""
                }`}
                onChange={this.handleRoomIdChange}
                onBlur={this.validateRoomId}
              >
                <option value="">Select an option</option>
                {this.state.loadedRooms.map((loadedRoom) => (
                  <option key={loadedRoom.id} value={loadedRoom.id}>
                    {loadedRoom.id} - {loadedRoom.name}, Location:{" "}
                    {loadedRoom.location} (Max seats: {loadedRoom.maxSeats})
                  </option>
                ))}
              </select>
              <div id="invalid-roomId" className="invalid-feedback">
                {this.state.roomIdError}
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="example-text-input"
              className="col-2 col-form-label"
            >
              Conference name
            </label>
            <div className="col-10">
              <input
                className={`form-control ${
                  this.state.nameError ? "is-invalid" : ""
                }`}
                type="text"
                name="name"
                placeholder="Baltic"
                maxLength="150"
                id="example-text-input"
                value={this.state.name}
                onChange={this.handleNameChange}
                onBlur={this.validateName}
              />
              <div id="invalid-name" className="invalid-feedback">
                {this.state.nameError}
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="example-datetime-local-input"
              className="col-2 col-form-label"
            >
              Date and time
            </label>
            <div className="col-10">
              <input
                className={`form-control ${
                  this.state.dateTimeError ? "is-invalid" : ""
                }`}
                type="datetime-local"
                name="dateTime"
                min="2019-09-31T00:00"
                max="2999-12-31T00:00"
                id="example-datetime-local-input"
                value={this.state.dateTime}
                onChange={this.handleDateTimeChange}
                onBlur={this.validateDateTime}
              />
              <div id="invalid-dateTime" className="invalid-feedback">
                {this.state.dateTimeError}
              </div>
            </div>
          </div>
          <div className="form-group">
            <button
              type="submit"
              disabled={!isEnabled}
              className="btn btn-success"
              onClick={this.handleSubmit}
            >
              Create conference
            </button>
          </div>
        </form>
      </div>
    );
  }
}
