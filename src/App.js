import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import CarList from './components/carList';
import CarDetails from './components/carDetails';
import CarBookingForm from './components/carBookingForm';


function App() {
	return (
		<div>
			<Router>
				<Switch>
					<Route exact path='/'>
						<CarList/>
					</Route>
					<Route exact path='/details/:id'>
						<CarDetails />
					</Route>
					<Route exact path='/booking/:id'>
						<CarBookingForm />
					</Route>
				</Switch>
			</Router>
		</div>
		
	);
}

export default App;
