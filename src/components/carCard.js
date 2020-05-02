import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import BookNowButton from './bookNowButton';

function CarCard(props) {
    let id = props.car.id.toString()
    return (
        <div>
            {props.car.carName}
            <BookNowButton id={id} isAvailable={!(props.car.bookingDetails.isBooked)}/>
            <Link to={'/details/' + id}><button>Details</button></Link>
        </div>
  );
}

export default CarCard;