const authService = require('../service/authService');

const signup = async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        await authService.signup({ name, email, password, role });

        return res.status(200).json({ message: 'Admin created! Sign-up with the credentials.' });

    } catch(err) {

        return res.status(403).json({ error: err.message });

    }

}

const signin = async (req, res) => {

    try {

        const { email, password } = req.body;

        const token = await authService.signin({ email, password });

        return res.status(200).json({ message: 'Admin signed in!', token: token });

    } catch(err) {

        return res.status(403).json({ error: err.message });

    }

}

module.exports = {
    signup: signup,
    signin: signin
}
