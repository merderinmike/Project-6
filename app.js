const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoConnect = require("./utils/db");
const sauceRoute = require("./routes/sauces");
const authLogin = require("./routes/auth.login");
const authSignup = require("./routes/auth.signup");
const fileUpload = require("./routes/imgUpload");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoConnect();

let gfs;
mongoose.connection.once("open", () => {
	gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
		bucketName: "uploads",
	});
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/file", fileUpload);
app.use("/api/sauces", sauceRoute);
app.use("/api/auth/login", authLogin);
app.use("/api/auth/signUp", authSignup);

app.listen(PORT, () => {
	console.log(`listening on port: ${PORT}`);
});
