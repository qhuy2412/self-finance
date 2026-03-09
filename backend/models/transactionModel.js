const db = require('../config/db');

const Transaction = {
    create: async (transaction) => {
        const { id, user_id, wallet_id, amount, type, description, transaction_date } = transaction;
        return await db.query(
            'INSERT INTO transactions (id, user_id, wallet_id, amount, type, description, transaction_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id, user_id, wallet_id, amount, type, description, transaction_date]
        );
    }
};
module.exports = Transaction;