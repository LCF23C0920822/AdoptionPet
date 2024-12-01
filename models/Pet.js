const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    namePet: String,
    type: String, 
    age: Number,
    breed: String,
    description: String,
    imagePath: String 
});

module.exports = mongoose.model('Pet', PetSchema, 'pets');

