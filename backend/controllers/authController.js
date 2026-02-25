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
        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET,
            {expiresIn:"15m"}
        );
        res.status(200).json({
            message: "Login successfully!",
            token : token,
            user: {
                userId : user.id,
                name: user.name,
                email : user.email
            }
        });
    }catch(error){
        res.status(500).json({error: error.message});
    }
}
module.exports = { register,login };