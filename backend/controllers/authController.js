const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel')

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required!' });
        }
        const existingUser = await User.findByEmail(email);
        if(existingUser){
            return res.status(400).json({error: "Email already used!"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userId = uuidv4().trim();
        await User.creat(userId,name, email, hashedPassword);
        res.status(201).json({message: "Register successfully!"});
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const login = async (req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({error:"Email or password is required!"});
        }
        const user = await User.findByEmail(email);
        if(!user){
            return res.status(401).json({error: "Email or password is incorrect!"});
        }
        const isMatch = await bcrypt.compare(password, user.password); 
        if(!isMatch){
            return res.status(401).json({error: "Email or password is incorrect!"});
        }
        const accessToken = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET,
            {expiresIn:"15m"}
        );
        const refreshToken = jwt.sign(
            {id:user.id},
            process.env.JWT_TOKEN_SECRET,
            {expiresIn: "30d"}
        );
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate()+30);
        await db.query('INSERT INTO Refresh_Tokens (user_id, token, expires_at) VALUES (?,?,?)', 
            [user.id, refreshToken, expiresAt]
        )
        const cookieOptions = { httpOnly: true, secure: false, sameSite: 'lax' };
        res.cookie('accessToken', accessToken, {...cookieOptions, maxAge: 15*60*1000});
        res.cookie('refreshToken', refreshToken, {...cookieOptions, maxAge:7*24*60*60*1000});
        res.status(200).json({user: {id: user.id, name: user.name}});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}
module.exports = { register,login };