const express = require("express");
const router = express.Router();
const walletController = require("../controllers/walletController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, walletController.createWallet);
router.get("/my-wallets", authMiddleware, walletController.getWalletsByUserId);
router.patch("/:id/rename", authMiddleware, walletController.renameWallet);

module.exports = router;