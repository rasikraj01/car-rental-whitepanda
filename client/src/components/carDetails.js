import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import moment from 'moment';

import '../scss/car-details.scss';
import CarCard from './carCard';
import Header from './header';
import Footer from './footer';

import {get_data} from '../actions/getInitialData';

function CarDetails() {
    let {id} = useParams();
    let car = useSelector(state => state.BookingReducer.filter(car => car._id == id))[0]
    console.log(car)
    if (car === undefined) car = false
    
    return (
        <div>
            <Header/>
            { (car) ?
            <div className="car-details">
                    <CarCard car={car} list={false}/>
                    <h3>Car Details</h3>
                    <hr/>
                    <div className="description">
                        {(car.isBooked) && <button>Not Available <FontAwesomeIcon icon={faTimes}/></button>}
                        <p>Vehicle No : {car.vehicleNo}</p>
                        <p>{car.fuelType} Car</p>
                        <p>{car.engineModel} Engine</p>
                        <p>{car.description}</p>
                    </div>
                    <h3>Current Booking</h3>
                    <hr/>
                    <table className="booking-details">
                        <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Issue Date</th>
                            <th>Return Date</th>
                        </tr>
                        {
                        car.isBooked && 
                        <tr>
                            <td>{car.bookingDetails[0].name}</td>
                            <td>{car.bookingDetails[0].phoneNumber}</td>
                            <td>{moment(car.bookingDetails[0].issueDate).format('DD/MM/YYYY')}</td>
                            <td>{moment(car.bookingDetails[0].returnDate).format('DD/MM/YYYY')}</td>
                        </tr>
                        }
                    </table>
                </div>

            : <div className="car-details">Loading...</div>}
            <Footer/>
        </div>
  );
}

export default CarDetails;
