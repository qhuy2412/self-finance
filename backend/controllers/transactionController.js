const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const Wallet = require('../models/walletModel');

const createTransaction = async (req, res) => {
    // Get a connection from the pool to ensure transactions are handled properly
    const connection = await db.getConnection();
    try {
        const userId = req.user.id;
        const { wallet_id, category_id, amount, type, note, transaction_date } = req.body;
        // Validate required fields
        if (!wallet_id || !category_id || !amount || !type || !transaction_date) {
            return res.status(400).json({ error: "Wallet, category, amount, type, and transaction date are required!" });
        };
        // Validate transaction type
        if (type !== 'income' && type !== 'expense') {
            return res.status(400).json({ error: "Type must be either 'income' or 'expense'!" });
        };
        // Start a transaction
        await connection.beginTransaction();
        // Check if the wallet belongs to the user
        const wallet = await Wallet.checkOwnership(wallet_id, userId);
        if (!wallet) {
            await connection.rollback();
            return res.status(403).json({ error: "You do not have permission to use this wallet!" });
        };
        // Insert the transaction
        const transactionId = uuidv4().trim();
        await connection.query(
            'INSERT INTO transactions (id, user_id, wallet_id, category_id, amount, type, description, transaction_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [transactionId, userId, wallet_id, category_id, amount, type, note || '', transaction_date]
        );
        // Update the wallet balance        const balanceChange = type === 'income' ? amount : -amount;
        const balanceChange = type === 'income' ? amount : -amount;
        await connection.query(
            'UPDATE wallets SET balance = balance + ? WHERE id = ?',
            [balanceChange, wallet_id]
        );
        // Commit the transaction
        await connection.commit();
        res.status(201).json({ message: 'Transaction created and wallet balance updated successfully!' });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    }finally {
        // Release the connection back to the pool
        connection.release();
    }
};
module.exports = { createTransaction };