const jwt = require("jsonwebtoken");
const User = require("../models/users");
const validateEmail = require("../utils/validators/emailValidator");
const validatePassword = require("../utils/validators/passwordValidator");
require("dotenv").config();
async function registerUser(req, res) {
	try {
		const { email, password } = req.body;

		if (!validateEmail(email) || !validatePassword(password)) {
			return res
				.status(400)
				.json({ message: "Invalid email or password" });
		}

		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: "Email already exists" });
		}

		user = new User({ email, password });
		await user.save();
		res.status(201).json({ message: "User Registered successfully!" });
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
}

async function loginUser(req, res) {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "No user found" });
		}
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}
		const key = process.env.SECRET_KEY;
		const token = jwt.sign({ id: user._id }, key, { expiresIn: "1hr" });
		res.json({ message: "Logged in successfully", token });
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
}

module.exports = { registerUser, loginUser };
