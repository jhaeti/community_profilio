const mongoose = require("mongoose");

const requesterSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  organization: {
    type: String,
    trim: true,
    required: true,
  },
  reason: {
    type: String,
    trim: true,
    required: true,
  },
  communityProfileRequested: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "CommunityProfile",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Requester = mongoose.model("Requester", requesterSchema);
module.exports = Requester;
