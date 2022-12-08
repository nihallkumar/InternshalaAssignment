const mongoose = require('mongoose');
const { Schema } = mongoose;

const CarSchema = new Schema({
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    customer: {
        type: String
    },
    vehicleModel: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    rentPerDay: {
        type: Number,
        required: true
    },
    booked: {
        type: Boolean,
        default: false
    },
    days: {
        type: Number
    },
    startDate: {
        type: Date
    }
});

module.exports = mongoose.model('car', CarSchema);