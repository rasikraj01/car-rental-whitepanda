const router = require('express').Router();

const Car = require('../models/car');

// add a booking
router.patch('/car/:id/book/', async (req, res) => {
    let isAlreadyBooked = await Car.findOne({_id : req.params.id})

    if (isAlreadyBooked === null) res.status(400).send({"message" : "No item found"})
    if(isAlreadyBooked.isBooked) 
    {
        res.status(400).send({"message": "Car is already Booked"})
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
                        bookingDetails : {
                            name :  req.body.name,
                            phoneNumber: req.body.phoneNumber,
                            issueDate:req.body.issueDate,
                            returnDate: req.body.returnDate
                            }
                        }
                    },
                    {new:true}
                )
            res.send(carUpdatedDetails).status(200)
        }catch (err){
            res.send(err).status(500)
        }
    }

})

// update a booking
router.patch('/car/:id/book/update/', async (req, res) => {
    let isAlreadyBooked = await Car.findOne({_id : req.params.id})

    if(isAlreadyBooked.isBooked)
    {
        try{
            const carUpdatedDetails = await Car.findByIdAndUpdate(
                    req.params.id, 
                    {
                    $set : {
                        bookingDetails : {
                            name :  req.body.name,
                            phoneNumber: req.body.phoneNumber,
                            issueDate:req.body.issueDate,
                            returnDate: req.body.returnDate
                            }
                        }
                    },
                    {new:true}
                )
            res.send(carUpdatedDetails).status(200)
        }catch (err){
            res.send(err).status(500)
        }
    }

})

// delete a booking
router.delete('/car/:id/book/', async (req, res) => {
    let currentCar = await Car.findOne({_id : req.params.id})
    let bookingId =  currentCar.bookingDetails[0]._id

    if (currentCar === null) res.status(400).send({"message" : "No item found"})
    
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
            res.send(err).status(500)
        }
    }

})

module.exports = router;