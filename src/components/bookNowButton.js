import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import '../scss/book-button.scss'
function BookNowButton(props) {
	return (
		<div className="book-button-container">
		<Link to={'/booking/' + props.id}>
			<button disabled={props.isBooked} className="book-now">Book Now</button>
		</Link>
		{	(props.isBooked) && 
				<div className="currently-unavailable">Currently Unavailable !</div>
		}
		</div>
	);
}

export default BookNowButton;