const mongoose = require("mongoose");
const { isEmail } = require("validator");

const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!isEmail(value)) {
				throw new Error("Email is invalid");
			}
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		trim: true
	}
});

UserSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
