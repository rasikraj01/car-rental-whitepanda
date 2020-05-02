import {carRentalDetails} from './data.js';

const BookingReducer = (state=carRentalDetails, action) => {
    switch(action.type){
        case 'BOOKING':
            return state
        default:
            return state
    }
}

export default BookingReducer;