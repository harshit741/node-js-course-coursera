const mongoose = require('mongoose');
const Schema = mongoose.Schema;                                // Schema variable

const commentSchema = new Schema({                              //Creating Comment Schema
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true  
});

const dishSchema = new Schema({                               //Creating dishes Schema
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema]                                //using comment schema in existing document                  
},{
    timestamps: true
});

var Dishes = mongoose.model('Dish' , dishSchema);               //creating model with schema

module.exports = Dishes;