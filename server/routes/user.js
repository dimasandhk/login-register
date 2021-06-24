const router = require("express").Router();
const User = require("../models/User");

const _ = require("lodash");

router.post("/", async (req, res) => {
	const newUser = new User(req.body);

	try {
		await newUser.save();
		res.status(201).send(newUser);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.loginAuth(email, password);
		res.send(user);
	} catch (err) {
		if (_.isEmpty(err))
			return res.status(500).send({
				error: "Email or Password doesn't match"
			});

		res.status(500).send(err);
	}
});

module.exports = router;
