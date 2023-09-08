const express = require("express");
const sgMail = require("@sendgrid/mail");
const auth = require("./middleware/auth");
const adminAuth = require("./middleware/adminAuth");
const { setCookie, clearCookie } = require("../utils/cookies");

const User = require("../db/models/user");
const CommunityProfile = require("../db/models/communityProfile");
const Requester = require("../db/models/requester");

const router = express.Router();

// Register Route
// @return { token, user}
router.post("/users/add-user", auth, adminAuth, async (req, res) => {
	const { name, email, password, role } = req.body;

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
		if (role) newUser.role = role;

		// Saving user with hash password into DataBase
		const user = await newUser.save();

		// Sending new user their credentials for accessing data
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		sgMail.send({
			from: process.env.DEFAULT_ADMIN_EMAIL,
			to: user.email,
			subject: "This are your details for Community Profilio Logins",
			html: `
			<div>
			<h3>Do not share this with anyone</h3>
			<div>Email: <strong style="color: black;">${user.email}</strong></div>
			<div>Password: <strong>${password}</strong></div>
			</div>
		`,
		});

		res.status(201).json({
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

// Delete one user from the database
// @return {user}
router.delete("/users/:id", auth, adminAuth, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.json("ID not attached to a user");
		}
		await user.remove();
		res.json({ user });
	} catch (e) {
		res.sendStatus(500);
	}
});

// Getting community profiles created by user
router.get("/users/community-profiles", auth, async (req, res) => {
	try {
		if (req.user.role === "BASIC") {
			await req.user.populate("communityProfiles").execPopulate();
			return res.json(req.user.communityProfiles);
		}
		const communityProfiles = await CommunityProfile.find();
		res.json(communityProfiles);
	} catch (e) {
		res.sendStatus(500);
	}
});
// Getting community profiles created by user
router.get("/users/requesters", auth, async (req, res) => {
	try {
		if (req.user.role === "BASIC") {
			await req.user.populate("requesters").execPopulate();
			return res.json(req.user.requesters);
		}
		const requesters = await Requester.find();
		res.json(requesters);
	} catch (e) {
		res.sendStatus(500);
	}
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
router.get("/users/count", auth, adminAuth, async (req, res) => {
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
		res.status(200).json(
			`${deletedCount} users have been successfully deleted`
		);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Updating a user
router.patch("users/:id", auth, adminAuth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name", "email", "password"];
	const isValidOperations = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperations) return res.status(400).json("Invalid operation");

	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			runValidators: true,
			new: true,
		});
		if (!user) return res.status(400).json("Invalid operation");
		res.json(user);
	} catch (e) {
		res.sendStatus(500);
	}
});

module.exports = router;
