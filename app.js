const express = require("express");
const mongoConnect = require("./utils/db");
const sauceRoute = require("./routes/sauces");
const authLogin = require("./routes/auth.login");
const authSignup = require("./routes/auth.signup");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoConnect();

app.use(express.json());

app.use("/api/sauces", sauceRoute);
app.use("/api/login", authLogin);
app.use("/api/signUp", authSignup);

app.listen(PORT, () => {
	console.log(`listening on port: ${PORT}`);
});
