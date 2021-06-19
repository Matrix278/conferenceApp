import React from "react";
import ConferenceRoomForm from "./ConferenceRoomForm";
import ConferenceRoomTable from "./ConferenceRoomTable";
import RoomDataService from "../../service/RoomDataService";

export default class ConferenceRoom extends React.Component {
  constructor(props) {
    super(props);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.state = {
      rooms: [],
    };
  }

  componentDidMount() {
    this.loadRoomsFromServer();
  }

  // Load conference rooms from database
  loadRoomsFromServer() {
    RoomDataService.retrieveAllRooms().then((response) => {
      // console.log(response);
      this.setState({ rooms: response.data });
    });
  }

  // Delete conference room
  deleteRoom(id) {
    RoomDataService.deleteRoom(id).then((response) => {
      this.loadRoomsFromServer();
    });
  }

  // Create new conference room
  createRoom(room) {
    RoomDataService.createRoom(room).then((response) => {
      this.loadRoomsFromServer();
    });
  }

  render() {
    return (
      <div>
        <ConferenceRoomForm createRoom={this.createRoom} />
        <ConferenceRoomTable
          deleteRoom={this.deleteRoom}
          rooms={this.state.rooms}
        />
      </div>
    );
  }
}
