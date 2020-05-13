const mongoose = require('mongoose');


const bookingDetailsSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        max: 255
    },
    phoneNumber : {
        type : Number,
        required: true
    },
    issueDate : {
        type : Date,
        required: true
    },
    returnDate : {
        type : Date,
        required: true
    }
});
module.exports = bookingDetailsSchema;
