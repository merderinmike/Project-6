// POST request body: {email: string, password: string}, response: {message: string}
const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/auth");

router.post("/", registerUser.registerUser);

module.exports = router;
