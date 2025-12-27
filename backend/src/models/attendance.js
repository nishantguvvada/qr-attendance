const mongoose = require('mongoose');

const Attendance = mongoose.model('Attendance', {
    membershipId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Membership', 
        required: true,
        index: true
    },
    clientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Client', 
        required: true 
    },
    planName: { 
        type: String, 
        ref: 'Plan', 
        required: true 
    },
    checkInTime: { 
        type: Date, 
        default: Date.now,
        index: true 
    },
    dayOfWeek: { type: Number },
    hourOfDay: { type: Number },
    scannedBy: { 
        type: String,
        required: true 
    },
    createdAt: Date
});

module.exports = Attendance;