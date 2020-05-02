import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import BookNowButton from './bookNowButton';

function CarDetails() {
    let {id} = useParams();
    const car = useSelector(state => state.BookingReducer.filter((car) => car.id == id))
    return (
        <div>
            CarDetails : {car[0].carName}

            <BookNowButton id={id} isAvailable={(car[0].bookingDetails.isBooked)}/>
            {!(car[0].bookingDetails.isBooked) && <p>Currently Unavailable X</p>}
        </div>
  );
}

export default CarDetails;
