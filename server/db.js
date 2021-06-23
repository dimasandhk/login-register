const mongoose = require("mongoose");

module.exports = function (callback) {
	mongoose.connect("mongodb://127.0.0.1:27017/login-register", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true
	});

	const db = mongoose.connection;
	db.on("error", function (err) {
		console.error(err);
		process.exit(1);
	});

	db.once("open", function () {
		console.log("Connected");
		callback();
	});
};
