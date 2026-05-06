const db = require("../config/db");
// Add Feedback
exports.addFeedback = (req, res) => {
    const { name, email, message } = req.body;
    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }
    // Insert feedback into database
    const sql = `
        INSERT INTO feedback (fd_name, fd_email, fd_message)
        VALUES (?, ?, ?)
    `;
    // Use parameterized query to prevent SQL injection
    db.run(sql, [name, email, message], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Database error" });
        }

        res.status(200).json({
            message: "Feedback saved successfully",
            id: this.lastID
        });
    });
};