const mongoose = require("mongoose");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

require("dotenv").config();

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
			const timestamp = new Date()
				.toISOString()
				.replace(/[-T:\.Z]/g, "")
				.slice(2, 14);

			const uid = Math.random().toString(36).substring(2, 8);

			const extension = file.originalname.split(".").pop();

			const newFilename = `${timestamp}-${uid}.${extension}`;

			const fileInfo = {
				filename: newFilename,
				bucketName: "uploads",
			};

			resolve(fileInfo);
		});
	},
});

module.exports = { storage };
