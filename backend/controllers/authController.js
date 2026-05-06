const db = require("../config/db");

// REGISTER
exports.register = (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    // Check if email exists
    const checkQuery = `SELECT * FROM users WHERE email = ?`;
    db.get(checkQuery, [email], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });

        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Insert user
        const insertQuery = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
        db.run(insertQuery, [username, email, password], function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.json({
                message: "User registered successfully",
                user_id: this.lastID
            });
        });
    });
};

// LOGIN
exports.login = (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT * FROM users WHERE username = ? AND password = ?`;

    db.get(query, [username, password], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user.user_id,
                username: user.username,
                email: user.email
            }
        });
    });
};