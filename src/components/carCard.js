import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import BookNowButton from './bookNowButton';

import '../scss/car-card.scss';

function CarCard(props) {
    let id = props.car.id.toString()
    return (
        <div className="car-card">
            {props.car.carName}
            <BookNowButton id={id} isAvailable={(props.car.bookingDetails.isBooked)}/>
            <Link to={'/details/' + id}><button>Details</button></Link>
        </div>
  );
}

export default CarCard;