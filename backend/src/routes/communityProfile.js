const express = require("express");

const CommunityProfile = require("../db/models/communityProfile");
const adminAuth = require("./middleware/adminAuth");
const auth = require("./middleware/auth");

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
router.get("/community-profiles/count", auth, adminAuth, async (req, res) => {
	try {
		const count = await CommunityProfile.countDocuments();

		res.json(count);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Deletes any CommunityProfile  by the [ids]
// ids should be sent in the body in a form of an array
// @returns Number of CommunityProfile  delete => int
router.delete("/community-profile", auth, adminAuth, async (req, res) => {
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
// router.post("/CommunityProfile ", auth, adminAuth, async (req, res) => {
// 	const { name, price, quantity, description } = req.body;
// 	const newCommunityProfile = new CommunityProfile {
// 		price,
// 		name,
// 		quantity,
// 		description,
// 	});

// 	try {
// 		const CommunityProfile = await newCommunityProfile save();
// 		res.status(201).json(CommunityProfile ;
// 	} catch (e) {
// 		res.sendStatus(500);
// 	}
// });

module.exports = router;
