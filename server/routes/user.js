const router = require("express").Router();
const User = require("../models/User");

router.post("/api/user", async (req, res) => {
	const newUser = new User(req.body);
	console.log(newUser);

	try {
		await newUser.save();
		console.log(newUser);
		res.status(201).send(newUser);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
