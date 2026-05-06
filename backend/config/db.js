const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Define the path to the SQLite database file
const dbPath = path.join(
    "D:",
    "My Projects",
    "sSQLite DB",
    "yumyard_db",
    "yumyard.db"   
);
// Connect to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Database connection error:", err.message);
    } else {
        console.log("Connected to SQLite database");
    }
});

// Create Tables
db.serialize(() => {

    db.run(`CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'active'
    )`, (err) => {
        if (err) console.error(err.message);
    });

    db.run(`CREATE TABLE IF NOT EXISTS foods (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL,
        image TEXT
    )`, (err) => {
        if (err) console.error(err.message);
    });

    db.run(`CREATE TABLE IF NOT EXISTS orders (
        order_id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_name TEXT NOT NULL,
        order_type TEXT CHECK(order_type IN ('lunch','dinner')),
        order_quantity INTEGER NOT NULL,
        subtotal REAL NOT NULL,
        delivery_price REAL NOT NULL,
        total_price REAL NOT NULL,
        terms_agreed INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'confirm'
    )`, (err) => {
        if (err) console.error(err.message);
    });

    db.run(`CREATE TABLE IF NOT EXISTS payments (
        payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        email TEXT,
        phone_number TEXT,
        address TEXT,
        card_owner_name TEXT,
        card_number TEXT,
        card_cvv TEXT,
        card_exp_date TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'confirm'
    )`, (err) => {
        if (err) console.error(err.message);
    });

    db.run(`CREATE TABLE IF NOT EXISTS feedback (
        fd_id INTEGER PRIMARY KEY AUTOINCREMENT,
        fd_name TEXT,
        fd_email TEXT,
        fd_message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'pending'
    )`, (err) => {
        if (err) console.error(err.message);
    });

});

module.exports = db;