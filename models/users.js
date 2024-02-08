const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: {
		type: "String",
		unique: true,
		required: true,
	},
	password: {
		type: "String",
		required: true,
	},
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
