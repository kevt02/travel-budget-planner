const dbConnection = require("../index.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.JSON_WEB_TOKEN; 

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Missing email or password" });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Use the comparePassword method to check if the passwords match
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If the password matches, generate a JWT token
        const token = jwt.sign({ uid: user._id }, process.env.JSON_WEB_TOKEN, { expiresIn: '7 days' });
        
        // Respond with token
        res.json({ success: true, message: 'Authentication successful!', token: token });
    } catch (error) {
        console.error("Error during authentication:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    login
};
