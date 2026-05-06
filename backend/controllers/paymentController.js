const db = require("../config/db");

// Add Payment
exports.addPayment = (req, res) => {
    const {
        first_name,
        last_name,
        email,
        phone_number,
        address,
        card_owner_name,
        card_number,
        card_cvv,
        card_exp_date
    } = req.body;
    // Basic validation
    const sql = `
        INSERT INTO payments 
        (first_name, last_name, email, phone_number, address,
         card_owner_name, card_number, card_cvv, card_exp_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    // Use parameterized query to prevent SQL injection
    db.run(sql, [
        first_name,
        last_name,
        email,
        phone_number,
        address,
        card_owner_name,
        card_number,
        card_cvv,
        card_exp_date
    ], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Payment failed" });
        }
        // Return success response with payment ID
        res.status(200).json({
            message: "Payment saved successfully",
            payment_id: this.lastID
        });
    });
};