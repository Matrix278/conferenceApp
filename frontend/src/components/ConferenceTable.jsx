import React from 'react';

export default class ConferenceTable extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    
    render() {

    return (
      <div>
      <hr/>
      <h4>Created conferences</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Room ID</th>
            <th scope="col">Conference name</th>
            <th scope="col">Date and time</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.conferences.map(
              conference =>
                  <tr key={conference.id}>
                      <td>{conference.id}</td>
                      <td>{conference.roomId}</td>
                      <td>{conference.name}</td>
                      <td>{conference.dateTime}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => this.props.deleteConference(conference.id)}>Cancel</button>
                      </td>
                  </tr>
            )
          }
        </tbody>
      </table>
      </div>);
  }
}