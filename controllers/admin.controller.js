const User = require('../models/user.model');
const TrainService = require('../models/trainservice.model');
const Booking = require('../models/booking.model');


// all registred users
exports.allUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message: 'All users',
            users,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};


// create new reservation
exports.createReservation = async (req, res) => {
    const { name, train_status, train_type } = req.body;
    try {
        if(!name && train_type && train_status){
            return res.status(403).json({
                message:"All input are required"
            })
        }
        const newReservation = await TrainService.create({
            name,
            train_status,
            train_type,
        });
        return res.status(201).json({
            message: 'New Reservation created successfully',
            newReservation,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};


// get all reservations
exports.allReservations = async (req, res) => {
    try {
        const reservations = await Booking.find();
        res.status(200).json({
            message: 'All reservations',
            reservations: reservations.length,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}