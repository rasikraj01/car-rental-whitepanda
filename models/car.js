const mongoose = require('mongoose');

const bookingDetailsSchema = require('./bookingDetails');

const carSchema = new mongoose.Schema({
    carName : {
        type: String,
        required: true,
        max: 255
    },
    imageUrl : {
        type : String,
        required: true
    },
    maxCapacity : {
        type: Number,
        required: true
    },
    rent : {
        type : Number,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    vehicleNo : {
        type : String,
        required : true
    },
    fuelType : {
        type : String,
        required : true
    },
    engineModel : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    isBooked : {
        type : Boolean,
        required : true,
        default : false
    },
    bookingDetails : [bookingDetailsSchema]
});

module.exports = mongoose.model('Car', carSchema);