const mongoose = require('mongoose');

const trainServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    train_status: {
        type: String,
        required: true,
    },
    train_type: {
        type: String,
        required: true,
        enum:["Reservation", "Business", "Economy"]
    }

});

module.exports = mongoose.model('TrainService', trainServiceSchema);
