const mongoose = require('mongoose');

const Admin = mongoose.model('Admin', {
    name: String,
    email: String,
    password: String,
    role: String,
    createdAt: Date
});

module.exports = Admin;