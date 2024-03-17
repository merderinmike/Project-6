const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

require("dotenv").config();

function upload() {
	console.log("upload running");
	const mongoUrl = process.env.MONGOSTRING;
	const conn = mongoose.connection;

	let gfs;
	conn.once("open", () => {
		gfs = Grid(conn.db, mongoose.mongo);
		gfs.collection("uploads");
	});

	const storage = new GridFsStorage({
		url: mongoUrl,
		file: (req, file) => {
			return new Promise((resolve, reject) => {
				const fileInfo = {
					filename: file.originalname,
					bucketName: "uploads",
				};

				resolve(fileInfo);
			});
		},
	});

	return multer({ storage });
}

module.exports = { upload };
