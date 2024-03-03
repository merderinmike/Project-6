const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

require("dotenv").config();

function upload() {
	const mongoUrl = process.env.MONGOSTRING;
	const storage = new GridFsStorage({
		url: mongoUrl,
		file: (req, file) => {
			return new Promise((resolve, _reject) => {
				const fileInfo = {
					filename: file.originalname,
					bucketName: "filesBucket",
				};

				resolve(fileInfo);
			});
		},
	});

	return multer({ storage });
}

module.exports = { upload };
