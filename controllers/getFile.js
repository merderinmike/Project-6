const mongoose = require("mongoose");
require("dotenv").config();
const { GridFSBucket } = require("mongodb");

const MONGOSTRING = process.env.MONGOSTRING;

mongoose.connect(MONGOSTRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const conn = mongoose.connection;
let bucket;

conn.on("error", console.error.bind(console, "connection error:"));
conn.once("open", function () {
	console.log("Connected to MongoDB");
	bucket = new GridFSBucket(conn.db, {
		bucketName: "uploads",
	});
});

const getFile = async (req, res) => {
	try {
		if (!bucket) {
			throw new Error("GridFS bucket is not initialized");
		}

		const file = await bucket
			.find({ filename: req.params.filename })
			.toArray();

		if (!file || file.length === 0) {
			return res.status(404).send({ error: "No file found" });
		}

		var downStream = bucket.openDownloadStream(file[0]._id);
		console.log(file[0]._id);
		console.log(file[0].contentType);
		res.set("Content-Type", file[0].contentType);

		downStream.pipe(res);
	} catch (error) {
		console.log("Error in getFile:", error);
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
