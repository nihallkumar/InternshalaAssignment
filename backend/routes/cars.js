const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


// ALL CARS
router.get('/allcars', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// AVAILABLE CARS
router.get('/availablecars', async (req, res) => {
    try {
        const cars = await Car.find({ booked: "false" });
        res.json(cars);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/current', async (req, res) => {
    try {
        let curr = new Date().getDate();
        const cars = await Car.find({ booked: "true" });

        let newCars=[];
        for (let i = 0; i < cars.length; i++) {

            let date=new Date(cars[i].startDate).getDate();
            let diff=date - curr;

            // console.log(cars[i].startDate);
            // console.log(diff);

            if (diff > 0) {
                newCars.push(cars[i]);
                // newCars = cars;
            }
        }
        res.json(newCars);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})

// MY CARS
router.get('/mycars', fetchuser, async (req, res) => {
    try {
        const cars = await Car.find({ agent: req.user.id });
        res.json(cars);

    } catch (error) {
        // console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// MY BOOKED CARS
router.get('/mybookedcars', fetchuser, async (req, res) => {
    try {
        const cars = await Car.find({ customer: req.user.id, booked: true });
        res.json(cars);

    } catch (error) {
        // console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// MY BOOKED CARS
router.get('/viewbookedcars', fetchuser, async (req, res) => {
    try {
        const cars = await Car.find({ agent: req.user.id, booked: true });
        res.json(cars);

    } catch (error) {
        // console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ADD NEW CAR
router.post('/addcar', fetchuser, [
    body('vehicleModel', 'Enter a valid Vehicle Model').isLength({ min: 1 }),
    body('vehicleNumber', 'Enter a valid Vehicle Number').isLength({ min: 1 }),
    body('capacity', 'capacity cannot be empty').isLength({ min: 1 }),
    body('rentPerDay', 'Rent per day cannot be empty').isLength({ min: 1 })
], async (req, res) => {
    // checking error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        let user = await User.findById(req.user.id);
        if (user.role == "agent") {
            const { vehicleModel, vehicleNumber, capacity, rentPerDay } = req.body;
            const car = new Car({
                vehicleModel, vehicleNumber, capacity, rentPerDay, agent: req.user.id
            })
            const newCar = await car.save();
            res.json(newCar);
        }
        else
            return res.status(400).json({ error: "You are not allowed, Sign in as Agent." });

    } catch (error) {
        // console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// EDIT LISTED CAR DETAILS
router.put('/updatecar/:id', fetchuser, [
    body('capacity', 'capacity cannot be empty').isLength({ min: 1 }),
    body('rentPerDay', 'Rent per day cannot be empty').isLength({ min: 1 })
], async (req, res) => {
    // checking error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findById(req.user.id);
        if (user.role == "agent") {
            // find car to be booked
            const car = await Car.findById(req.params.id);
            if (!car) { return res.status(404).send("Not Found") };

            if (car.agent.toString() !== req.user.id) {
                return res.status(401).send("You Are Not Allowed To Delete This Car");
            }

            const { vehicleModel, vehicleNumber, capacity, rentPerDay } = req.body;
            let updateCar = {};
            updateCar.vehicleModel = vehicleModel;
            updateCar.vehicleNumber = vehicleNumber;
            updateCar.capacity = capacity;
            updateCar.rentPerDay = rentPerDay;

            const updatedCar = await Car.findByIdAndUpdate(req.params.id, { $set: updateCar }, { new: true });
            res.json({ updatedCar });
        }
        else
            return res.status(400).json({ error: "You are not allowed, Sign in as Agent." });

    } catch (error) {
        // console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});



// RE-LIST CAR
router.put('/listagain/:id', fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (user.role == "agent") {
            // find car to be booked
            const car = await Car.findById(req.params.id);
            if (!car) { return res.status(404).send("Not Found") };

            if (car.agent.toString() !== req.user.id) {
                return res.status(401).send("You Are Not Allowed To Re-List This Car");
            }

            let updateCar = {};
            updateCar.customer = "";
            updateCar.booked = false;
            updateCar.days = "";
            updateCar.startDate = "";

            const updatedCar = await Car.findByIdAndUpdate(req.params.id, { $set: updateCar }, { new: true });
            res.json({ updatedCar });
        }
        else
            return res.status(400).json({ error: "You are not allowed, Sign in as Agent." });

    } catch (error) {
        // console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// BOOK A CAR
router.put('/bookcar/:id', fetchuser, [
    body('days', 'Enter valid Days').isLength({ min: 1 }),
    body('startDate', 'Enter a valid Date').isLength({ min: 1 }),
], async (req, res) => {
    // checking error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findById(req.user.id);
        if (user.role == "customer") {
            // find car to be booked
            const car = await Car.findById(req.params.id);
            if (!car) {
                return res.status(404).send("Not Found")
            };

            const { days, startDate } = req.body;
            let bookCar = {};
            bookCar.days = days;
            bookCar.startDate = startDate;
            bookCar.customer = user.id;
            bookCar.booked = true;

            const bookedCar = await Car.findByIdAndUpdate(req.params.id, { $set: bookCar }, { new: true });
            res.json({ bookedCar });
        }
        else
            return res.status(400).json({ error: "You are not allowed, Sign in as Customer." });

    } catch (error) {
        // console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});


//DELETE CAR
router.delete('/deletecar/:id', fetchuser, async (req, res) => {
    try {
        let car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).send("Not Found");
        }

        if (car.agent.toString() !== req.user.id) {
            return res.status(401).send("You Are Not Allowed To Delete This Car");
        }

        car = await Car.findByIdAndDelete(req.params.id);
        res.json({ "success": "car has been removed", car })

    } catch (error) {
        // console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;