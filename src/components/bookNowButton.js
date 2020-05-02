import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

function BookNowButton(props) {
	return (
		<Link to={'/booking/' + props.id}>
			<button disabled={props.isAvailable}>
				BOOK NOW
			</button>
		</Link>
	);
}

export default BookNowButton;