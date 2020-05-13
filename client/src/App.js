import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';

import {get_data} from './actions/getInitialData';
import axios from 'axios';
import CarList from './components/carList';
import CarDetails from './components/carDetails';
import CarBookingForm from './components/carBookingForm';
import CarBookingUpdateForm from './components/carBookingUpdateForm';

import './scss/reset.scss';


function App() {

	const dispatch = useDispatch()
	useEffect(() => {

		// update the store initially
		axios
			.get('/api/car/list')
			.then((response)=>{
				if(response.status === 200){
					dispatch(get_data(response.data))
				}
			})
			.catch( (err) => {
				if(axios.isCancel(err)){
					console.log('cancelled')
				}else{
					console.log(err);
				}
			})

	}, [])

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
					<Route exact path='/booking/update/:id'>
						<CarBookingUpdateForm />
					</Route>
				</Switch>
			</Router>
		</div>
		
	);
}

export default App;
