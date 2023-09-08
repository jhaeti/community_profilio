const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();
require("./db/mongoose");

const communityProfileRouter = require("./routes/communityProfile");
const userRouter = require("./routes/user");
const requesterRouter = require("./routes/requester");

const app = express();

// Add middleware
app.use(cookieParser());

app.use(
	cors({
		origin: true,
		credentials: true,
	})
);

app.use(express.json({ extended: false }));

// Using routers
app.use(communityProfileRouter);
app.use(userRouter);
app.use(requesterRouter);

module.exports = app;
