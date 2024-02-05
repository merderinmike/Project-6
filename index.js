const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const mongoPw = process.env.MONGOPW;

mongoose.connect(
	`mongodb+srv://ashehorn:${mongoPw}@pilquante.tvy95o9.mongodb.net/?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useCreateIndex: true,
	},
	(err) => {
		if (!err) {
			console.log("MongoDB Connection Succeeded.");
		} else {
			console.log("Error in DB connection: " + err);
		}
	}
);
