const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = process.env.JWT_SECRET;

// ALL USERS
router.get('/allusers', async (req, res) => {
    try {
        const users = await User.find();
        //  res.json(users);
         res.send(users);


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// SIGINUP 
router.post('/signup', [
    body('name', 'Enter a valid Name').isLength({ min: 1 }),
    body('username', 'Enter a valid Username').isLength({ min: 1 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    // checking error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let success = false;
        // checking whether the user with this username exists already 
        let user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).json({ success, error: 'User with this username already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            role: req.body.role,
            username: req.body.username,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({ success, token });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// LOGIN
router.post('/login', [
    body('username', 'Enter a valid Username').isLength({ min: 1 }),
    body('password', 'Password cannot be blank').isLength({ min: 1 })
], async (req, res) => {
    // checking error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let success = false;
        const { username, password } = req.body;
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success, error: "Please login with correct credentials" });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(400).json({ success, error: "Please login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, token });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// getting logged user details
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// get user details by id
router.post('/getuserid', async (req, res) => {
    try {
        const user = await User.findById(req.body.id);
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;