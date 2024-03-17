const express = require("express");
const { upload } = require("../middleware/upload");
const fileController = require("../controllers/getFile");
const router = express.Router();

router.post("/upload/file", upload().single("file"), async (req, res) => {
	try {
		res.status(200).json({ file: req.file });
		// res.status(201).json({ text: "File uploaded successfully !" });
	} catch (error) {
		console.log(error);
		res.status(400).json({
			error: { text: "Unable to upload the file", error },
		});
	}
});

router.get("/files/:filename", fileController.getFile);

router.get("/files", fileController.getFiles);

module.exports = router;
