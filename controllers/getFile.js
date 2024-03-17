const mongoose = require("mongoose");

const getFile = async (req, res) => {
	try {
		const file = await mongoose.connection.db
			.collection("uploads.files")
			.findOne({ filename: req.params.filename });
		if (!file) {
			return res.status(404).send({ error: "No file found" });
		}
		// const readStream = gfs.openDownloadStream(file._id);
		// readStream.pipe(res);

		res.status(200).json(file);
	} catch (error) {
		res.status(500).send({ error: "Error accessing the file" });
	}
};

const getFiles = async (req, res) => {
	try {
		const filesCursor = await mongoose.connection.db
			.collection("uploads.files")
			.find();
		const files = await filesCursor.toArray();

		if (!files || files.length === 0) {
			return res.status(404).send({ error: "No files found" });
		}
		res.status(200).json(files);
	} catch (error) {
		res.status(500).send({ error: "Error accessing the files" });
	}
};
module.exports = { getFile, getFiles };
