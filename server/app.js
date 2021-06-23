const express = require("express");
const app = express();

const initConnection = require("./db");
initConnection(function () {
	launchServer();
});

const launchServer = () => {
	// Config
	const PORT = process.env.PORT || 3000;

	// Middleware
	app.use(express.json());

	// Routes
	app.use("/api/user", require("./routes/user"));

	app.listen(PORT, () => {
		console.log(`Up on port ${PORT}`);
	});
};
