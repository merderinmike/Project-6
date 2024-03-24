// GET /api/sauces response: {array of sauces}
// GET /api/sauces/:id response: {Single sauce}
// POST /api/sauces request body: {sauce: string, image: File} response: {message: string} (Verb) *return response from multer
// PUT /api/sauces/:id request body: {EITHERSauce as JSON OR { sauce:String, image: File }} response: {message: string}
// DELETE /api/sauces/:id request body: {}, response  {message: string}
// POST /api/sauces/:id/like request body: { userId: string, like: number}, response {message: string}

const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authToken");
const saucesController = require("../controllers/sauces");

router.get("/", authenticate.authenticateToken, saucesController.getSauces);

router.get(
	"/:id",
	authenticate.authenticateToken,
	saucesController.getOneSauce
);

router.post(
	"/",
	authenticate.authenticateToken,
	// upload().single("file"),
	saucesController.addSauce
);

router.put("/:id");

router.delete(
	"/:id",
	authenticate.authenticateToken,
	saucesController.deleteSauce
);

router.post("/:id/like", saucesController.likeSauce);

module.exports = router;
