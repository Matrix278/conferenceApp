import React from "react";

export default class ConferenceRoomTable extends React.Component {
  render() {
    return (
      <div>
        <hr />
        <h4>Created rooms</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Room name</th>
              <th scope="col">Location</th>
              <th scope="col">Max seats</th>
            </tr>
          </thead>
          <tbody>
            {this.props.rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.name}</td>
                <td>{room.location}</td>
                <td>{room.maxSeats}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.props.deleteRoom(room.id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
