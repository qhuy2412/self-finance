const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const Wallet = require('../models/walletModel');

const createWallet = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("User ID from token:", userId);
        const {name, currency, balance} = req.body;
        if(!name || !currency || balance === undefined){
            return res.status(400).json({error: "Name, currency and balance are required!"});
        }
        const existingWallets = await Wallet.findByUserId(userId);
        for (const wallet of existingWallets) {
            if (wallet.name === name) {
                return res.status(400).json({ error: 'Wallet name already exists!' });
            }
        }
        const walletId = uuidv4().trim();
        await Wallet.create(walletId, userId, name, currency, balance);
        res.status(201).json({ message: 'Wallet created successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getWalletsByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        const wallets = await Wallet.findByUserId(userId);
        res.status(200).json(wallets);
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const renameWallet = async (req, res) => {
    try {
        const userId = req.user.id;
        const walletId = req.params.id;
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required!' });
        }
        const existingWallets = await Wallet.findByUserId(userId);
        for (const wallet of existingWallets) {
            if (wallet.name === name) {
                return res.status(400).json({ error: 'Wallet name already exists!' });
            }
        }
        await Wallet.rename(walletId, name);
        res.status(200).json({ message: 'Wallet renamed successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = { createWallet, getWalletsByUserId, renameWallet };