import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Conference from './conference/Conference';
import ConferenceRoom from './room/ConferenceRoom';
import Participant from './participant/Participant';

export default class NavigationSwitcher extends React.Component {
      render() {
        return (
			<Router>
				<div>
				<h2>Conference Application</h2>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<ul className="navbar-nav mr-auto">
					<li><Link to={'/rooms'} className="nav-link">Rooms</Link></li>
					<li><Link to={'/conferences'} className="nav-link">Conferences</Link></li>
					<li><Link to={'/participants'} className="nav-link">Participants</Link></li>
				</ul>
				</nav>
				<hr />
				<Switch>
					<Route exact path='/rooms' component={ConferenceRoom} />
					<Route path='/conferences' component={Conference} />
					<Route path='/participants' component={Participant} />
				</Switch>
				</div>
			</Router>
        );
    }

}