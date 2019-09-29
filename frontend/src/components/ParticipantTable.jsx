import React from 'react';

export default class ParticipantTable extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    
    render() {

    return (
      <div>
      <hr/>
      <h4>All participants</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
			<th scope="col">Conference ID</th>
			<th scope="col">Full name</th>
            <th scope="col">Birth date</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.participants.map(
              participant =>
                  <tr key={participant.id}>
				  	  <td>{participant.id}</td>
                      <td>{participant.conferenceId}</td>
                      <td>{participant.fullName}</td>
                      <td>{participant.birthDate}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => this.props.deleteParticipant(participant.id)}>Cancel</button>
                      </td>
                  </tr>
            )
          }
        </tbody>
      </table>
      </div>);
  }
}