const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    name: String, 
    description: String, 
    imageUrl: String, 
    defficultyLevel: Number
});

module.exports = mongoose.model('Cube', modelSchema);