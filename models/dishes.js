const mongoose = require('mongoose');
const Schema = mongoose.Schema;                                // Schema variable

const dishSchema = new Schema({                               //Creating Schema
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

var Dishes = mongoose.model('Dish' , dishSchema);               //creating model with schema

module.exports = Dishes;