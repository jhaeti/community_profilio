const express = require("express");
const sgMail = require("@sendgrid/mail");
const Requester = require("../db/models/requester");
const auth = require("./middleware/auth");
const CommunityProfile = require("../db/models/communityProfile");

const router = express.Router();

// Making a request for a full profile
router.post("/requesters", async (req, res) => {
	try {
		const { name, email, organization, reason, communityProfileRequested } =
			req.body;
		const communityProfile = await CommunityProfile.findById(
			communityProfileRequested
		);

		if (communityProfile) {
			const newRequester = new Requester({
				name,
				email,
				organization,
				reason,
				communityProfileRequested: communityProfile._id,
				userToGrant: communityProfile.poster,
				granted: false,
			});
			await newRequester.save();
			await communityProfile.populate("poster").execPopulate();

			sgMail.setApiKey(process.env.SENDGRID_API_KEY);
			const msg = {
				to: communityProfile.poster.email,
				from: process.env.DEFAULT_ADMIN_EMAIL,
				subject: `Community Profilio`,
				html: `<p>${req.body.name} is requesting for main profile</p>`,
			};
			sgMail.send(msg).catch(() => console.log("Message not sent"));
			return res
				.status(200)
				.json("Request for main profile sent successfully");
		}
		res.sendStatus(400);
	} catch (e) {
		res.sendStatus(500);
	}
});

router.get("/requesters/:id/grant", auth, async (req, res) => {
	const { id } = req.params;
	const requester = await Requester.findById(id);
	await requester.populate("communityProfileRequested").execPopulate();
	const textBuffered = requester.communityProfileRequested.mainProfile;

	if (requester) {
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		const msg = {
			from: process.env.DEFAULT_ADMIN_EMAIL,
			to: requester.email,
			subject: "Community Profilio",
			html: "<p>Here’s it the community profile you requested for.</p>",
			attachments: [
				{
					content: textBuffered.toString("base64"),
					filename: `${requester.communityProfileRequested.name}.pdf`,
					type: "application/pdf",
					disposition: "attachment",
					content_id: requester._id,
				},
			],
		};
		sgMail
			.send(msg)
			.then(async () => {
				requester.granted = true;
				requester.grantedDate = new Date();
				await requester.save();
				res.json(
					`Main Profile for ${requester.communityProfileRequested.name} has been sent to ${requester.email}`
				);
			})
			.catch(() => {
				console.error("Not granted");
				res.status(500);
			});
	}
});

module.exports = router;
