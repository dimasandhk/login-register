const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

const auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		const decoded = jwt.verify(token, process.env.JWTSECRET);

		const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
		if (!user) throw new Error();

		req.token = token;
		req.user = user;
		next();
	} catch (err) {
		res.status(401).send({ error: "Authentication Needed" });
	}
};

module.exports = auth;
