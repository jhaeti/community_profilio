const express = require("express");

const Product = require("../db/models/product");
const adminAuth = require("./middleware/adminAuth");
const auth = require("./middleware/auth");

const router = express.Router();

// Get all products from database
// @return a [products]
router.get("/products", async (req, res) => {
	try {
		const products = await Product.find();
		res.send(products);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Count number of Products in database
// @returns a Number of products => int
router.get("/products-count", auth, adminAuth, async (req, res) => {
	try {
		const count = await Product.countDocuments();

		res.json(count);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Deletes any products by the [ids]
// ids should be sent in the body in a form of an array
// @returns Number of products delete => int
router.delete("/products", auth, adminAuth, async (req, res) => {
	try {
		const id = req.body;
		const { deletedCount } = await Product.deleteMany({ _id: { $in: id } });
		res.status(200).json(deletedCount);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Post an product to /products
router.post("/products", auth, adminAuth, async (req, res) => {
	const { name, price, quantity, description } = req.body;
	const newProduct = new Product({
		price,
		name,
		quantity,
		description,
	});

	try {
		const product = await newProduct.save();
		res.status(201).json(product);
	} catch (e) {
		res.sendStatus(500);
	}
});

module.exports = router;
