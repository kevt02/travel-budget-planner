const dbConnection = require("../config.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.JSON_WEB_TOKEN; 

const login = (req, res) => {
    const { email, password } = req.body; 

    if (!email || !password) {
        return res.status(400).json({ message: "Missing email or password" });
    }

    
    const sql = "SELECT * FROM User WHERE Email = ?"; 
    dbConnection.query(sql, [email], async (error, results, fields) => {
        if (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        
        if (results.length > 0) {
            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.Password);
            
            if (passwordMatch) {
                const token = jwt.sign({ uid: user.UID }, secret, { expiresIn: '7 days' });
                res.json({ success: true, message: 'Authentication successful!', token: token });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
};

module.exports = {
    login
};
