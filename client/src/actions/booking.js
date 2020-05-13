export const addBooking = (payload) => {
    return {
        type : 'ADD_BOOKING',
        payload : payload
    }
}

export const deleteBooking = (payload) => {
    return {
        type : 'DELETE_BOOKING',
        payload : payload
    }
}

export const updateBooking = (payload) => {
    return {
        type : 'UPDATE_BOOKING',
        payload : payload
    }
}