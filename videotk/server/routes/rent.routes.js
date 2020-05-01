const express = require("express");
const app = express();
const rentRoute = express.Router();

// Rent model
let Models = require("../Models");
let Rent = Models.rent;

// Add Rent
rentRoute.route("/addR").post((req, res, next) => {
	Rent.create(req.body, (error, data) => {
		if (error) {
			console.log(error);
		} else {
			res.json(data);
		}
	});
});

// Get All Rent
rentRoute.route("/getallR").get((req, res) => {
	Rent.find((error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

// Get single Rent
rentRoute.route("/getR/:id").get((req, res) => {
	Rent.findById(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

// Update Rent
rentRoute.route("/updateR/:id").put((req, res, next) => {
	Rent.findByIdAndUpdate(
		req.params.id,
		{
			$set: req.body,
		},
		(error, data) => {
			if (error) {
				return next(error);
				console.log(error);
			} else {
				res.json(data);
				console.log("Data updated successfully");
			}
		}
	);
});

// Delete Rent
rentRoute.route("/deleteR/:id").delete((req, res, next) => {
	Rent.findOneAndRemove(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.status(200).json({
				msg: data,
			});
		}
	});
});

module.exports = rentRoute;
