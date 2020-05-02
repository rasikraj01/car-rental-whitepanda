import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';

function CarBookingForm() {

	let history = useHistory();
	let {id} = useParams()
	
	const toPreviousRoute = () => {
		history.goBack()
	}
	return (
		<div>
			<h1>Booking Details</h1>
			<img alt="logo"/>
			<form>
			</form>
				<button onClick={toPreviousRoute}>Back</button>
		</div>
  );
}

export default CarBookingForm;