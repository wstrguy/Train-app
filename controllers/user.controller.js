const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createJWT = require('../utils/jwt.js')
const Booking = require('../models/booking.model');
const TrainService = require('../models/trainservice.model');



// user signup
exports.userSignup = async (req, res) => {
    const { first_name, last_name, email, password, phone } = req.body;
    try {
        // check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exists',
            });
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create new user
        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            phone,
        });
        // save user to database
        const savedUser = await newUser.save();
        res.status(201).json({
            message: 'User created successfully',
            user: savedUser,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};



// user login
exports.userlogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExistinDb = await User.findOne({ email });
        if (!userExistinDb) {
            return res.status(404).json({
                message: 'User does not exist',
            });
        }
        // compare password
        const isMatch = await bcrypt.compare(password, userExistinDb.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials',
            });
        }


        // create token
        const accessToken = await createJWT({
            id: userExistinDb._id,
            email: userExistinDb.email,
            first_name: userExistinDb.first_name,
            role: userExistinDb.role,
        });
        
        // set cookie
        res.cookie('jwt', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        res.status(200).json({
            message: 'User logged in successfully',
            accessToken,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// user booking 
exports.userBooking = async (req, res) => {
    const { userId, destination, date, time, type } = req.body;
    const { id } = req.user;
    try {
        console.log(id);
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
       const booking = await Booking.create({
            userId: user._id,
            destination,
            date,
            time,
            type,
        });
        return res.status(201).json({
            message: 'Booking created successfully',
            booking,
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};


// user edit booking
exports.userEditBooking = async (req, res) => {
    const { id } = req.params;
    const { time } = req.body;
    try {
        // check if booking exists
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found',
            });
        }
        // update booking
        const updatedBooking = await Booking.findByIdAndUpdate(id,
            { time },
            { new: true });
        return res.status(200).json({
            message: 'Booking updated successfully',
            updatedBooking,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// user delete booking
exports.userDeleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
        const bookingExist = await Booking.findById(id);
        if (!bookingExist) {
            return res.status(404).json({
                message: 'Booking not found',
            });
        }
        const delBooking = await Booking.findByIdAndDelete(id);
        return res.status(200).json({
            message: 'Booking deleted successfully',
            delBooking,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};


//  user get all bookings

exports.userGetAllBookings = async (req, res) => {
    const { id } = req.user;
    try {
        const users = await TrainService.find();
        return res.status(200).json({
            message: 'All Services',
            users,
        });
    } catch (error) {
        
    }
}