const db = require('../config/db');

const User = {
    findByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },
    creat : async (id, name, email, hashedPassword) => {
        return await db.query(
            'Insert into Users (id,name,email,password) VALUES (?,?,?,?)',[id,name,email,hashedPassword]
        );
    }
};
module.exports = User;