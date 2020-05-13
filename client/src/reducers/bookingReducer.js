// import {carRentalDetails} from './data.js';
import axios from 'axios';

const BookingReducer = (state=[], action) => {
    switch(action.type){
        case 'ADD_BOOKING':

        // update store booking
            state.forEach((car) => {
                if(car._id == action.payload._id){
                    car.isBooked = true
                    car.bookingDetails.push(action.payload.bookingDetails[0])
                }
            })
            return state
        case 'DELETE_BOOKING':
            state.forEach((car) => {
                if(car._id == action.payload._id){
                    car.isBooked = false
                    car.bookingDetails.pop()
                }
            })
            return state
        case 'UPDATE_BOOKING':
            state.forEach((car) => {
                if(car._id === action.payload._id && car.isBooked === true){
                    car.bookingDetails[0] = action.payload.bookingDetails[0]
                }
            })
            return state
        case 'GET_DATA':
            return action.payload
            
        default:
            return state
    }
}

export default BookingReducer;