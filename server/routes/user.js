const router = require("express").Router();
const User = require("../models/User");
const auth = require("../auth/profile");

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
		const token = await user.generateToken();
		res.send({ user, token });
	} catch (err) {
		if (_.isEmpty(err))
			return res.status(500).send({
				error: "Email or Password doesn't match"
			});

		res.status(500).send(err);
	}
});

router.post("/logout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(({ token }) => {
			return token !== req.token;
		});

		await req.user.save();
		res.send({ message: "Logout Success" });
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get("/me", auth, (req, res) => {
	res.send(req.user);
});

module.exports = router;
