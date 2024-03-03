const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoConnect = require("./utils/db");
const sauceRoute = require("./routes/sauces");
const authLogin = require("./routes/auth.login");
const authSignup = require("./routes/auth.signup");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoConnect();

(() => {
	mongoose.connection.on("connected", () => {
		new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
			bucketName: "filesBucket",
		});
	});
})();

app.use(express.json());
app.use(cors());

app.use("/api/sauces", sauceRoute);
app.use("/api/auth/login", authLogin);
app.use("/api/auth/signUp", authSignup);

app.listen(PORT, () => {
	console.log(`listening on port: ${PORT}`);
});
