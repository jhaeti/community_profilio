const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();
require("./db/mongoose");

// const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

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
// app.use(productRouter);
app.use(userRouter);

module.exports = app;
