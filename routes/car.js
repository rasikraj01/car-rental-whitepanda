const router = require('express').Router();

const Car = require('../models/car');


// add new car route
router.post('/car/add', async (req, res) => {

    
    // add car
    const car = new Car({
        carName : req.body.carName,
        imageUrl : req.body.imageUrl,
        maxCapacity : req.body.maxCapacity,
        rent : req.body.rent,
        color : req.body.color,
        vehicleNo : req.body.vehicleNo,
        fuelType : req.body.fuelType,
        engineModel : req.body.engineModel,
        description : req.body.description
    })
    console.log(car);
    
    // save user
    try{
        const savedCar = await car.save()
        res.send({
            id : savedCar._id,
            carName : savedCar.carName,
            imageUrl : savedCar.imageUrl,
            maxCapacity : savedCar.maxCapacity,
            rent : savedCar.rent,
            color : savedCar.color,
            vehicleNo : savedCar.vehicleNo,
            fuelType : savedCar.fuelType,
            engineModel : savedCar.engineModel,
            description : savedCar.description,
            isBooked : savedCar.isBooked
        }).status(200)

    }catch (err) {
        res.send(err).status(400)
    }
})

// get list of all cars
router.get('/car/list/', async (req, res) => {
    try{
        const carList = await Car.find()
        res.send(carList).status(200)
    }catch (err){
        res.send(err).status(400)
    }
})

// get a single car details
router.get('/car/:id/', async (req, res) => {
    try{
        const carDetails = await Car.find({_id : req.params.id})
        res.send(carDetails).status(200)
    }catch (err){
        res.send(err).status(400)
    }
})

router.get('/', () => {
    res.render('data')
})

module.exports = router;