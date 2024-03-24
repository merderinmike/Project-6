const express = require("express");
const fileController = require("../controllers/getFile");
const router = express.Router();

router.get("/files/:filename", fileController.getFile);

router.get("/files", fileController.getFiles);

module.exports = router;
