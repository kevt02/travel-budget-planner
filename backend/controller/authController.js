const dbConnection = require("../config.js");

const jwt = require('jsonwebtoken');

const secret = process.env.JSON_WEB_TOKEN;

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Missing email or password" });
    }

    const sql = "SELECT * FROM User WHERE Email = ?";
    dbConnection.query(sql, [email], (error, results, fields) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length > 0) {
            const user = results[0];
            // Since passwords are plain text, compare them directly
            if (password === user.Password) {
                /// const token = jwt.sign({ uid: user.UID }, secret, { expiresIn: '7 days' });
                const token = jwt.sign({ uid: user.UID }, 'temporary_secret', { expiresIn: '7 days' });

                res.json({ success: true, message: 'Authentication successful!', uid: user.UID, token: token });
                console.log('UID:', user.UID); // This should confirm UID is being retrieved correctly

            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
};

module.exports = {
    login
};


/*const login = (req, res) => {
    const { email, password } = req.body; 

    if (!email || !password) {
        return res.status(400).json({ message: "Missing email or password" });
    }

    
    const sql = "SELECT * FROM User WHERE Email = ?"; 
    // Inside your login function in authController.js
dbConnection.query(sql, [email], async (error, results, fields) => {
    if (error) {
        console.error("Database query error:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    
    if (results.length > 0) {
        const user = results[0];
        console.log("User found:", user); // For debugging, remove this line after.
        try {
            const passwordMatch = await bcrypt.compare(password, user.Password);
            console.log("Password match:", passwordMatch); // For debugging, remove this line after.

            if (passwordMatch) {
                const token = jwt.sign({ uid: user.UID }, secret, { expiresIn: '7 days' });
                res.json({ success: true, message: 'Authentication successful!', token: token });
            }else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (bcryptError) {
            console.error("Bcrypt comparison error:", bcryptError);
            res.status(500).json({ message: 'Error while processing credentials' });
        }
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
};*/