const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

userSchema.pre("save", async function (next) {
	let user = this; // Corrected variable name to 'user'
	if (!user.isModified("password")) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(user.password, salt);
		user.password = hash;
		next();
	} catch (err) {
		next(err);
	}
});

userSchema.methods.comparePassword = async function (candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password);
};

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
