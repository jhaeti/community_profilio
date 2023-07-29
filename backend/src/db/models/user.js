const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Creating User Model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  role: {
    type: String,
    default: (v) => {
      if (v !== "ADMIN") return "BASIC";
    },
    enum: ["BASIC", "ADMIN"],
    required: true,
  },
});

// Virtual item field for the user
userSchema.virtual("communityProfiles", {
  ref: "CommunityProfile",
  localField: "_id",
  foreignField: "poster",
});

// Ensures password and tokens are not sent to the client when when request about a user is made
userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// A method to simply generate a token for a user and saves it for future use
// Sends the just created token to be saved on the client
userSchema.methods.generateAuthToken = async function () {
  const user = this;

  // Creating the token with jwt
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
  // Copying previous tokens if any and adding the new token
  user.tokens = [...user.tokens, { token }];
  await user.save();
  return token;
};

// Removes the current token on the browser from the database
userSchema.methods.removeToken = async function (token) {
  const user = this;
  user.tokens = user.tokens.filter(
    (tokenObject) => tokenObject.token !== token
  );
  await user.save();
};

// Method on the User collection to find a user by accepting email and password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User does not exist");
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    throw new Error("User does not exist");
  }

  // Send user if there is no errors
  return user;
};

// This middleware function runs after a save method is called on a user
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
