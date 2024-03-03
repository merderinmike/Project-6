const mongoose = require("mongoose");

const saucesSchema = new mongoose.Schema({
	userId: {
		type: "String",
		required: true,
	},
	name: {
		type: "String",
		requuired: true,
	},
	manufacturer: {
		type: "String",
		required: true,
	},
	description: {
		type: "String",
		required: true,
	},
	mainPepper: {
		type: "String",
		required: true,
	},
	imageUrl: {
		type: "String",
		required: true,
	},
	heat: {
		type: "Number",
		required: true,
	},
	likes: {
		type: "Number",
		required: true,
	},
	dislikes: {
		type: "Number",
		required: true,
	},
	usersLiked: {
		type: [String],
		required: true,
		default: [],
	},
	usersDisliked: {
		type: [String],
		required: true,
		default: [],
	},
});

const Sauces = mongoose.model("Sauces", saucesSchema);
module.exports = Sauces;
