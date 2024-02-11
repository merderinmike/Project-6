const mongoose = require("mongoose");
require("dotenv").config();

const mongoConnect = async () => {
	const mongoString = process.env.MONGOSTRING;
	try {
		await mongoose.connect(mongoString);
		console.log("MongoDB connected successfully");
	} catch (err) {
		console.error("Failed to connect to MongoDB", err);
		process.exit(1);
	}
};

module.exports = mongoConnect;
