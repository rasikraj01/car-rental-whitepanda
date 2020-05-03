import React from 'react';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import '../scss/car-details.scss';
import CarCard from './carCard';
import Header from './header';
import Footer from './footer';

function CarDetails() {
    let {id} = useParams();
    const car = useSelector(state => state.BookingReducer.filter((car) => car.id == id))[0]
    return (
        <div>
            <Header/>
            <div className="car-details">
                <CarCard car={car} list={false}/>
                <h3>Car Details</h3>
                <hr/>
                <div className="description">
                    {(car.bookingDetails.isBooked) && <button>Not Available <FontAwesomeIcon icon={faTimes}/></button>}
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
                    car.bookingDetails.isBooked && 
                    <tr>
                        <td>{car.bookingDetails.name}</td>
                        <td>{car.bookingDetails.phoneNumber}</td>
                        <td>{car.bookingDetails.issueDate}</td>
                        <td>{car.bookingDetails.returnDate}</td>
                    </tr>
                    }
                </table>
            </div>
            <Footer/>
        </div>
  );
}

export default CarDetails;
