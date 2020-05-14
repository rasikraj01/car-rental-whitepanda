const router = require('express').Router();

const Car = require('../models/car');
const validateData = require('../validations/validateData');

// add a booking
router.post('/car/:id/book/', async (req, res) => {
    let currentCar = await Car.findOne({_id : req.params.id})

    if (currentCar === null) res.status(400).send({"error" : "No item found"})
    if(currentCar.isBooked) 
    {
        res.status(400).send({"error": "Car is already Booked"})
    }
    else{
        
        let data = {
            name :  req.body.name,
            phoneNumber: req.body.phoneNumber,
            issueDate:req.body.issueDate,
            returnDate: req.body.returnDate
            }
        let errors = validateData(data);
        // check if error object is empty
        if(Object.keys(errors).length !== 0 && errors.constructor === Object) {
            res.status(400).send(errors)
        }
        else{
            try{
                const carUpdatedDetails = await Car.findByIdAndUpdate(
                        req.params.id, 
                        {
                            $set : {
                            isBooked: true,
                        },
                        $push : {
                            bookingDetails : data
                            }
                        },
                        {new:true}
                    )
                res.send(carUpdatedDetails).status(200)
            }catch (err){
                res.send(err).status(400)
            }
        }
    }

})

// update a booking
router.put('/car/:id/book/update/', async (req, res) => {
    let currentCar = await Car.findOne({_id : req.params.id})
    let bookingId =  currentCar.bookingDetails[0]._id
    
    if(currentCar.isBooked)
    {

        let data = {
            name :  req.body.name,
            phoneNumber: req.body.phoneNumber,
            issueDate:req.body.issueDate,
            returnDate: req.body.returnDate
            }
        let errors = validateData(data);
        // check if error object is empty
        if(Object.keys(errors).length !== 0 && errors.constructor === Object) {
            res.status(400).send(errors)
        }
        else{
            try{
                const carUpdatedDetails = await Car.findOneAndUpdate(
                        {"bookingDetails._id" : bookingId},
                        {
                        $set : {
                            "bookingDetails.$.name" : req.body.name,
                            "bookingDetails.$.phoneNumber" : req.body.phoneNumber,
                            "bookingDetails.$.issueDate" :req.body.issueDate,
                            "bookingDetails.$.returnDate" : req.body.returnDate
                            }
                        },
                        {new:true}
                    )
                res.send(carUpdatedDetails).status(200)
            }catch (err){
                res.send(err).status(400)
            }
        }
    }

})

// delete a booking
router.delete('/car/:id/book/', async (req, res) => {
    let currentCar = await Car.findOne({_id : req.params.id})
    let bookingId =  currentCar.bookingDetails[0]._id

    if (currentCar === null) res.status(400).send({"error" : "No item found"})
    
    if(currentCar.isBooked){
        try{
            const deleteBookingDetails = await Car.findByIdAndUpdate(
                    req.params.id, 
                    {
                        $set : {
                            isBooked : false
                        },
                        $pull : {
                            bookingDetails : {
                                _id : bookingId
                            }
                        }
                    },
                    { multi: true , new : true }
                )
            res.send(deleteBookingDetails).status(200)
        }catch (err){
            res.send(err).status(400)
        }
    }

})

module.exports = router;