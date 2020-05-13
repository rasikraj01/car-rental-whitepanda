export const booking = (payload) => {
    return {
        type : 'BOOKING',
        payload : payload
    }
}

export const deleteBooking = (payload) => {
    return {
        type : 'DELETE_BOOKING',
        payload : payload
    }
}