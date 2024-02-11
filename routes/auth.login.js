// POST, request body: {email: string, password: string} response: {userId: string, token: string}
const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
router.post("/", authController.loginUser);

module.exports = router;
