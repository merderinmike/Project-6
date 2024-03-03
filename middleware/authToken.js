const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.authenticateToken = async (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (token === null) {
		return res.status(401).json({ error: "Authentication required" });
	}

	try {
		const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
		const user = await User.findById(decodedToken.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		req.user = user;
		next();
	} catch (err) {
		res.status(401).json({ message: "Invalid token" });
	}
};
