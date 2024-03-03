// GET /api/sauces response: {array of sauces}
// GET /api/sauces/:id response: {Single sauce}
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
		const id = req.params.id;
		const userId = req.user.id;
		const sauce = await Sauces.findById(id);

		if (!sauce) {
			return res.status(400).json({ message: "Sauce not found " });
		}
		// Checks if user has already liked the sauce
		if (sauce.usersLiked.includes(userId)) {
			return res
				.status(400)
				.json({ message: "User has already liked this suace." });
		}

		sauce.usersLiked.push(userId);
		sauce.likes += 1;

		await sauce.save();

		res.json({ message: "Sauce liked successfully" });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Server error", error: error.message });
	}
};
