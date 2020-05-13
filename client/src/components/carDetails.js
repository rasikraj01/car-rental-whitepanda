import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import moment from 'moment';

import {deleteBooking} from '../actions/booking';

import '../scss/car-details.scss';
import CarCard from './carCard';
import Header from './header';
import Footer from './footer';

import {get_data} from '../actions/getInitialData';

function CarDetails() {

    let {id} = useParams();
    let dispatch = useDispatch()

    let car = useSelector(state => state.BookingReducer.filter(car => car._id == id))[0]
    if (car === undefined) car = false

    const handleDeleteBooking = () => {
            axios
                .delete(`/api/car/${id}/book/`)
                .then((response) => {
                    console.log(response);
                    if(response.status === 200){
                        dispatch(deleteBooking({_id : id}))
                    }
                })
    }

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
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Issue Date</th>
                                <th>Return Date</th>
                            </tr>
                        </thead>
                        {
                        car.isBooked && 
                        <tbody>
                            <tr>
                                <td>{car.bookingDetails[0].name}</td>
                                <td>{car.bookingDetails[0].phoneNumber}</td>
                                <td>{moment(car.bookingDetails[0].issueDate).format('DD/MM/YYYY')}</td>
                                <td>{moment(car.bookingDetails[0].returnDate).format('DD/MM/YYYY')}</td>
                                <td><button onClick={handleDeleteBooking} className="delete-button">Delete</button></td>
                                <td><Link to={'/booking/update/' + id} className="update-button"><button>Update</button></Link></td>
                            </tr>
                        </tbody>
                        }
                    </table>
                </div>

            : <div className="car-details">Loading...</div>}
            <Footer/>
        </div>
  );
}

export default CarDetails;
