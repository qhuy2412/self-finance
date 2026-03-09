const db = require('../config/db');

const Wallet = {
    findByUserId: async (userId) => {
        const [rows] = await db.query('SELECT * FROM wallets WHERE user_id = ?', [userId]);
        return rows;
    },
    create: async (walletId, userId, name, currency, balance) => {
        console.log("Creating wallet with ID:", walletId, "for user ID:", userId);
        return await db.query(
            'INSERT INTO wallets (id, user_id, name, currency, balance) VALUES (?, ?, ?, ?, ?)',
            [walletId, userId, name, currency, balance]
        );
    },
    rename: async (walletId, name) => {
        return await db.query(
            'UPDATE wallets SET name = ? WHERE id = ?',
            [name, walletId]
        );
    },
    checkOwnership: async (walletId, userId) => {
        const [rows] = await db.query(
            'SELECT id FROM wallets WHERE id = ? AND user_id = ?',
            [walletId, userId]
        );
        return rows.length > 0;
    }
};
module.exports = Wallet;