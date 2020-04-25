const express = require('express');
const app = express();
const clientRoute = express.Router();

// Client model
let Models = require('../Models');
let Client = Models.client;

// Add Client
clientRoute.route('/addC').post((req, res, next) => {
    Client.create(req.body, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            res.json(data)
        }
    });
});

// Get All Client
clientRoute.route('/getallC').get((req, res) => {
    Client.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get single Client
clientRoute.route('/getC/:id').get((req, res) => {
    Client.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update Client
clientRoute.route('/updateC/:id').put((req, res, next) => {
    Client.findByIdAndUpdate(req.params.id, {
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

// Delete Client (Only for testing! Actual deletion only results in state change)
clientRoute.route('/deleteC/:id').delete((req, res, next) => {
    Client.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = clientRoute;
