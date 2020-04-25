const express = require('express');
const app = express();
const rentableRoute = express.Router();

// Rentable model
let Models = require('../Models');
let Rentable = Models.rentable;

// Add Rentable
rentableRoute.route('/addRA').post((req, res, next) => {
    Rentable.create(req.body, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            res.json(data)
        }
    });
});

// Get All Rentable
rentableRoute.route('/getallRA').get((req, res) => {
    Rentable.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get single Rentable
rentableRoute.route('/getRA/:id').get((req, res) => {
    Rentable.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update Rentable
rentableRoute.route('/updateRA/:id').put((req, res, next) => {
    Rentable.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Data updated successfully')
        }
    })
})

// Delete Rentable
rentableRoute.route('/deleteRA/:id').delete((req, res, next) => {
    Rentable.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = rentableRoute;