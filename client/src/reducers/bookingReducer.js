import {carRentalDetails} from './data.js';

const BookingReducer = (state=carRentalDetails, action) => {
    switch(action.type){
        case 'BOOKING':
            carRentalDetails.forEach((car) => {
                if(car.id == action.payload.id){
                    car.bookingDetails.isBooked = true
                    car.bookingDetails.name = action.payload.name
                    car.bookingDetails.phoneNumber = action.payload.phoneNumber
                    car.bookingDetails.issueDate = action.payload.issueDate
                    car.bookingDetails.returnDate = action.payload.returnDate
                }
            })
            return carRentalDetails
        default:
            return state
    }
}

export default BookingReducer;