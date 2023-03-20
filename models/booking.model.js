const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    destination: {
        type: String,
    },
    date: {
        type: Date,
    },
    time: {
        type: String,
    },
    type: {
        type: String,
        required: true,
        enum:["Reservation", "Business", "Economy"]
    },

});

module.exports = mongoose.model('Booking', bookingSchema);