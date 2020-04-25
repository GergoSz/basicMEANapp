const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let rentableSchema = new Schema({
    title: String,
    dateofAcquisition: Date,
    serNum: {
        type: Number,
        required: true,
        unique: true
    },
    state: {
        type: String,
        enum: ['AVAILABLE', 'RENTED', 'RUINED'],
        default: 'AVAILABLE'
    },
    type: {
        type: String,
        enum: ['DVD', 'CASSETTE', 'OTHER'],
        default: 'DVD'
    }

}, {
    collection: 'rentables'
});

let rentSchema = new Schema({
    dateofRent: Date,
    expiry: Date,
    Rented: [rentableSchema]
}, {
    collection: 'rents'
});

let clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNum: {
        type: Number
    },
    IDnum: {
        type: Number,
        unique: true,
        required: true
    },
    adress: {
        city: String,
        street: String,
        house: Number
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    Rents: [rentSchema]


}, {
    collection: 'clients'
})

module.exports = { 
    rentable: mongoose.model('Rentable', rentableSchema),
    rent: mongoose.model('Rent', rentSchema),
    client: mongoose.model('Client', clientSchema)
} ;