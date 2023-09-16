const express = require("express");
const multer = require("multer");

const CommunityProfile = require("../db/models/communityProfile");
const adminAuth = require("./middleware/adminAuth");
const auth = require("./middleware/auth");

const upload = multer({});

const router = express.Router();

// Get all CommunityProfile  from database
// @return a [CommunityProfile ]
router.get("/community-profiles", async (req, res) => {
	try {
		const communityProfiles = await CommunityProfile.find();
		res.send(communityProfiles);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Count number of CommunityProfile  in database
// @returns a Number of CommunityProfile  => int
router.get("/community-profiles/count", auth, async (req, res) => {
	try {
		const count = await CommunityProfile.countDocuments();

		res.json(count);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Delete one user from the database
// @return {user}
router.delete("/community-profiles/:id", auth, async (req, res) => {
	try {
		const communityProfile = await CommunityProfile.findById(req.params.id);
		if (!communityProfile) {
			return res.json("ID not attached to a community profile");
		}

		// Check whether user is admin or is the one who posted that profile
		if (
			req.user.role === "ADMIN" ||
			communityProfile.poster.toString() === req.user._id.toString()
		)
			await communityProfile.remove();
		res.json({ communityProfile });
	} catch (e) {
		res.sendStatus(500);
	}
});

// Deletes any CommunityProfile  by the [ids]
// ids should be sent in the body in a form of an array
// @returns Number of CommunityProfile  delete => int
router.delete("/community-profiles", auth, adminAuth, async (req, res) => {
	try {
		const id = req.body;
		const { deletedCount } = await CommunityProfile.deleteMany({
			_id: { $in: id },
		});
		res.status(200).json(
			`${deletedCount} community profiles have been successfully deleted`
		);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Post an CommunityProfile to /CommunityProfile
router.post(
	"/community-profiles",
	auth,
	upload.fields([
		{ name: "imgs", maxCount: 10 },
		{ name: "abstract", maxCount: 1 },
		{ name: "mainProfile", maxCount: 1 },
	]),
	async (req, res) => {
		const newCommunityProfile = new CommunityProfile({
			...req.body,
			imgsNumber: req.files.imgs.length,
			imgs: req.files.imgs.map((img) => img.buffer),
			abstract: req.files.abstract[0].buffer,
			mainProfile: req.files.mainProfile[0].buffer,
			poster: req.user._id,
		});
		try {
			const communityProfile = await newCommunityProfile.save();
			res.status(201).json({ communityProfile });
		} catch (e) {
			res.sendStatus(500);
		}
	}
);

// Serving abstract of the community profile
router.get("/community-profiles/:id/abstract", async (req, res) => {
	try {
		const communityProfile = await CommunityProfile.findById(req.params.id);
		res.set("Content-Type", "application/pdf");
		res.send(communityProfile.abstract);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Serving mainProfile of the community Profile
// router.get("/community-profiles/:id/mainProfile", async (req, res) => {
// 	try {
// 		const communityProfile = await CommunityProfile.findById(req.params.id);
// 		res.set("Content-Type", "application/pdf");
// 		res.send(communityProfile.mainProfile);
// 	} catch (e) {
// 		res.sendStatus(500);
// 	}
// });

// Getting a single communityProfile
router.get("/community-profiles/:id", async (req, res) => {
	try {
		const communityProfile = await CommunityProfile.findById(req.params.id);
		res.json(communityProfile);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Serving imgs of the community profile
router.get("/community-profiles/:id/imgs/:position", async (req, res) => {
	try {
		const communityProfile = await CommunityProfile.findById(req.params.id);
		const pos = +req.params.position;
		if (pos >= communityProfile.imgsNumber)
			return res
				.status(400)
				.json(`Image with index ${pos} does not exist`);
		res.set("Content-Type", "image/jpg");
		res.send(communityProfile.imgs[pos]);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Updating an already existing community profile
router.patch(
	"/community-profiles/:id",
	auth,
	upload.fields([
		{ name: "imgs", maxCount: 10 },
		{ name: "abstract", maxCount: 1 },
		{ name: "mainProfile", maxCount: 1 },
	]),
	async (req, res) => {
		const updates = Object.keys(req.body);
		const allowedUpdates = ["name", "region", "district"];
		const isValidOperation = updates.every((update) =>
			allowedUpdates.includes(update)
		);
		if (!isValidOperation) return res.json("Invalid operations");
		try {
			const communityProfile = await CommunityProfile.findByIdAndUpdate(
				req.params.id,
				req.body,
				{ runValidators: true, new: true }
			);
			if (!communityProfile)
				return res.status(400).json("Invalid operations");

			if (req.files.imgs) {
				communityProfile.imgsNumber = req.files.imgs.length;
				communityProfile.imgs = req.files.imgs.map((img) => img.buffer);
			}
			if (req.files.abstract)
				communityProfile.abstract = req.files.abstract[0].buffer;
			if (req.files.mainProfile)
				communityProfile.mainProfile = req.files.mainProfile[0].buffer;

			await communityProfile.save();
			res.json(communityProfile);
		} catch (e) {
			res.sendStatus(500);
		}
	}
);

module.exports = router;
