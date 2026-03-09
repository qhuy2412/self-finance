const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const getCategories = async (req, res) => {
    try {
        const userId = req.user.id;
        const [categories] = await db.query(
            `SELECT id, name, type, color, icon, is_default 
             FROM Categories 
             WHERE (is_default = 1 OR user_id = ?) 
             AND deleted_at IS NULL
             ORDER BY type, name`,
            [userId]
        )
        res.status(200).json({message: 'Categories retrieved successfully!', categories});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const createCategory = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, type, color, icon } = req.body;
        if (!name || !type) {
            return res.status(400).json({ error: "Name and type are required!" });
        }
        const [existingCategories] = await db.query(
            'SELECT id FROM Categories WHERE user_id = ? AND name = ? AND type = ? AND deleted_at IS NULL',
            [userId, name, type]
        );
        if(type !== 'income' && type !== 'expense') {
            return res.status(400).json({ error: "Type must be either 'income' or 'expense'!" });
        }
        if (existingCategories.length > 0) {
            return res.status(400).json({ error: 'Category already exists!' });
        }
        const categoryId = uuidv4().trim();
        await db.query(
            'INSERT INTO Categories (id, user_id, name, type, color, icon) VALUES (?, ?, ?, ?, ?, ?)',
            [categoryId, userId, name, type, color || '#12e40f', icon || 'default-icon']
        );
        res.status(201).json({ message: 'Category created successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { getCategories, createCategory };