// POST /api/sauces request body: {sauce: string, image: File} response: {message: string} (Verb) *return response from multer
// PUT /api/sauces/:id request body: {EITHERSauce as JSON OR { sauce:String, image: File }} response: {message: string}
// DELETE /api/sauces/:id request body: {}, response  {message: string}
// POST /api/sauces/:id/like request body: { userId: string, like: number}, response {message: string}
const Sauces = require("../models/sauces");

exports.getSauces = async (req, res) => {
	try {
		const sauces = await Sauces.find({});

		res.json(sauces);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

exports.getOneSauce = async (req, res) => {
	try {
		const id = req.params.id;
		const sauce = await Sauces.findById(id);
		if (!sauce) {
			return res.status(400).json({ message: "Suace not found" });
		}

		res.json(sauce);
	} catch (error) {
		if (error.kind === "ObjectId") {
			return res.status(400).json({ message: "Invalid Id format" });
		}
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

exports.addSauce = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: "Image file is required" });
		}
		const sauceData = JSON.parse(req.body.sauce);
		sauceData.imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
			req.file.filename
		}`;
		sauceData.likes = 0;
		sauceData.dislikes = 0;
		sauceData.usersLiked = [];
		sauceData.usersDisliked = [];
		const sauce = new Sauces(sauceData);
		await sauce.save();

		res.status(201).json({
			message: "Sauce created successfully",
			sauceId: sauce._id,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error saving the sauce",
			error: error.message,
		});
	}
};

exports.deleteSauce = async (req, res) => {
	try {
		const id = req.params.id;
		const sauce = await Sauces.findById(id);
		if (!sauce) {
			return res.status(400).json({ message: "Sauce not found" });
		}
		// req.user.id takes the userId from the token that is sent for auth from the front end and checks it against the sauce userId to validate ownership
		if (sauce.userId.toString() !== req.user.id.toString()) {
			res.status(403).json({
				message:
					"Unauthorized, you do not have permission to delete this sauce.",
			});
		}

		await Sauces.findByIdAndDelete(id);
		res.json({ message: "Sauce deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

exports.likeSauce = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.userId;
		const like = Number(req.params.like);
		const sauce = await Sauces.findById(id);

		if (!sauce) {
			return res.status(404).json({ message: "Sauce not found" });
		}

		let message = "Sauce liked successfully";

		if (like === 1) {
			if (!sauce.usersLiked.includes(userId)) {
				sauce.usersLiked.push(userId);
				sauce.likes = sauce.usersLiked.length;
			} else {
				return res
					.status(400)
					.json({ message: "User has already liked this sauce." });
			}
		} else if (like === 0) {
			let updated = false;
			if (sauce.usersLiked.includes(userId)) {
				sauce.usersLiked = sauce.usersLiked.filter(
					(user) => user !== userId
				);
				sauce.likes = sauce.usersLiked.length;
				message = "Like removed successfully";
				updated = true;
			}
			if (sauce.usersDisliked.includes(userId)) {
				sauce.usersDisliked = sauce.usersDisliked.filter(
					(user) => user !== userId
				);
				sauce.dislikes = sauce.usersDisliked.length;
				message = updated
					? "Like and dislike removed successfully"
					: "Dislike removed successfully";
			}
		} else if (like === -1) {
			if (!sauce.usersDisliked.includes(userId)) {
				sauce.usersDisliked.push(userId);
				sauce.dislikes = sauce.usersDisliked.length;
			} else {
				return res
					.status(400)
					.json({ message: "User has already disliked this sauce." });
			}
		} else {
			return res.status(400).json({ message: "Invalid like value" });
		}

		await sauce.save();
		res.json({ message });
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
