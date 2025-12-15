const mongoose = require('mongoose');

const Plans = mongoose.model('Plans', {
    name: String,
    description: String,
    duration: {
        type: Number,
        enum: [30, 90, 180, 360]
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        set: v => mongoose.Types.Decimal128.fromString(v.toString())
    },
    createdAt: Date
});

module.exports = Plans;