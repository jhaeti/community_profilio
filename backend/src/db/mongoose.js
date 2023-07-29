const mongoose = require("mongoose");
const User = require("./models/user");

// Getting mongo uri base on environment
const uri =
	(process.env.NODE_ENV === "production" && process.env.MONGO_URI) ||
	(process.env.NODE_ENV === "test" && process.env.MONGO_TEST_URI) ||
	process.env.MONGO_DEV_URI;

// Connect to mongoDB
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.info("Mongodb Connected...");
		// Creating an a default admin for the database
		const {
			DEFAULT_ADMIN_NAME: name,
			DEFAULT_ADMIN_EMAIL: email,
			DEFAULT_ADMIN_PASSWORD: password,
		} = process.env;

		const defaultAdminUser = new User({
			name,
			email,
			password,
			role: "ADMIN",
		});
		User.findOne({ email })
			.then((user) => {
				if (user === null) {
					// Returning a promise inside a promise allows for capturinf of next data return by the promise returned in the next .then method
					return User.find();
				}
			})
			.then(async (users) => {
				// Check for the existence of data
				// Proceed if there is not document in the User collection
				if (users && users.length === 0) {
					// Save the default user if the database is new with no data stored in it
					await defaultAdminUser.save();
				}
			})
			.catch((e) => console.info(e));
		console.info("Admin is Present...");
	})
	.catch((e) => console.warn("Not connected to mongodb", e));
