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
  date: {
    type: Date,
    default: Date.now,
  },
});

communityProfileSchema.methods.toJSON = function () {
  const communityProfile = this;

  const communityProfileObject = communityProfile.toObject();
  delete communityProfileObject.password;
  delete communityProfileObject.tokens;

  return communityProfile;
};

const CommunityProfile = mongoose.model(
  "CommunityProfile",
  communityProfileSchema
);
module.exports = CommunityProfile;
