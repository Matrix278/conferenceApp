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
              conference => {
                let dateOfStart = conference.dateTime.substring(0, 10); //DATE
                let timeOfStart = conference.dateTime.substring(11, 16); //TIME
                return <tr key={conference.id}>
                  <td>{conference.id}</td>
                  <td>{conference.roomId}</td>
                  <td>{conference.name}</td>
                  <td>{dateOfStart} {timeOfStart}</td>
                  <td>
                    <button className="btn btn-danger"
                            onClick={() => this.props.deleteConference(conference.id)}>Cancel
                    </button>
                  </td>
                </tr>
              })
          }
        </tbody>
      </table>
      </div>
    );
  }
}