const db = require("../config/db");

// Create Order
const createOrder = (req, res) => {
    const {
        product_name,
        order_type,
        order_quantity,
        subtotal,
        delivery_price,
        total_price,
        terms_agreed
    } = req.body;

    // Basic validation
    if (
        !product_name || order_quantity == null || subtotal == null || total_price == null
    ) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    // Insert order into database
    const sql = `
        INSERT INTO orders 
        (product_name, order_type, order_quantity, subtotal, delivery_price, total_price, terms_agreed)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    // Use parameterized query to prevent SQL injection
    db.run(
        sql,
        [
            product_name,
            order_type,
            order_quantity,
            subtotal,
            delivery_price,
            total_price,
            terms_agreed ? 1 : 0
        ],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: "Failed to create order" });
            }

            res.status(201).json({
                message: "Order created successfully",
                order_id: this.lastID
            });
        }
    );
};

module.exports = { createOrder };