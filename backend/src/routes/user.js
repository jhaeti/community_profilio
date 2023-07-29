const express = require("express");
const auth = require("./middleware/auth");
const adminAuth = require("./middleware/adminAuth");
const { setCookie, clearCookie } = require("../controllers/cookies");

const User = require("../db/models/user");

const router = express.Router();

// Register Route
// @return { token, user}
router.post("/users/register", async (req, res) => {
	const { name, email, password } = req.body;

	// Basic validation
	if (!name || !email || !password) {
		return res.status(400).json("Please enter all fields");
	}

	try {
		//   Check whether user already exist
		const previousUser = await User.findOne({ email });
		if (previousUser) {
			return res.status(400).json("Invalid Credentials");
		}

		// Create new User if user does not exist
		const newUser = new User({ ...req.body, token: [] });

		// Saving user with hash password into DataBase
		const user = await newUser.save();
		const token = await user.generateAuthToken();

		setCookie(res, process.env.AUTH_COOKIE_NAME, token);
		res.status(201).json({
			token,
			user,
		});
	} catch (e) {
		res.status(500).send();
	}
});

// Login Route
// @return { token, user}
router.post("/users/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		// Find user by credentials
		const user = await User.findByCredentials(email, password);

		// Generate token for that user
		const token = await user.generateAuthToken();
		setCookie(res, process.env.AUTH_COOKIE_NAME, token);

		res.json({ token, user });
	} catch (e) {
		res.status(404).json(e.message);
	}
});

// Getting user just from having correct cookies set
// @return { token, user}
router.get("/users/me", auth, (req, res) => {
	const { token, user } = req;
	res.json({ token, user });
});

// Delete self from the databse
// @return {user}
router.delete("/users/me", auth, async (req, res) => {
	const user = await req.user.remove();
	clearCookie(res, process.env.AUTH_COOKIE_NAME);
	res.json({ user });
});

// Handling Logout functionality
// @return a status code 200
router.get("/users/logout", auth, async (req, res) => {
	const { user } = req;
	await user.removeToken(req.token);
	// Clear cookies from the browser
	clearCookie(res, process.env.AUTH_COOKIE_NAME);
	res.sendStatus(200);
});

// Get all user from the database
router.get("/users", auth, adminAuth, async (req, res) => {
	try {
		const users = await User.find();
		res.send(users);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Count number of Users in database
// @returns a number
router.get("/users-count", auth, adminAuth, async (req, res) => {
	try {
		const count = await User.countDocuments();
		res.json(count);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Delete any user by their id
// This is only accessible only by admins
router.delete("/users", auth, adminAuth, async (req, res) => {
	try {
		const id = req.body;
		const { deletedCount } = await User.deleteMany({ _id: { $in: id } });
		res.status(200).json(deletedCount);
	} catch (e) {
		res.sendStatus(500);
	}
});

module.exports = router;
