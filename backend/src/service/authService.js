const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const dotenv = require('dotenv');
dotenv.config();

const signup = async ({ name, email, password, role }) => {
        
    const exists = await Admin.findOne({ email: email });

    if(exists) {

        throw new Error("Admin already exists, try signing in.");

    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newAdmin = await Admin.create({
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
        createdAt: new Date().getTime()
    });

    return newAdmin;

}

const signin = async ({ email, password }) => {
        
    const exists = await Admin.findOne({ email: email });

    if(!exists) {

        throw new Error("Admin does not exists, try signing up.");

    } else {
        
        const validatePassword = await bcrypt.compare(password, exists.password);

        if(!validatePassword) {

            throw new Error("Incorrect password. Try again.");

        }

    }

    const token = jwt.sign({ id: exists._id, email: exists.email, role: exists.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return token;    

}

module.exports = {
    signup: signup,
    signin: signin
}