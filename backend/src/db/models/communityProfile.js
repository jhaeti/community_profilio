const mongoose = require("mongoose");

// Creating Item Model
const communityProfileSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	region: {
		type: String,
		trim: true,
		required: true,
	},
	district: {
		type: String,
		trim: true,
		required: true,
	},
	abstract: {
		type: Buffer,
		required: true,
	},
	mainProfile: {
		type: Buffer,
		required: true,
	},
	imgs: [
		{
			type: Buffer,
			required: true,
		},
	],
	imgsNumber: {
		type: Number,
		required: true,
	},
	poster: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

communityProfileSchema.methods.toJSON = function () {
	const communityProfile = this;

	const communityProfileObject = communityProfile.toObject();
	delete communityProfileObject.imgs;
	delete communityProfileObject.abstract;
	delete communityProfileObject.mainProfile;

	return communityProfileObject;
};

const CommunityProfile = mongoose.model(
	"CommunityProfile",
	communityProfileSchema
);
module.exports = CommunityProfile;
