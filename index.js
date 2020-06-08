const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/newDb';

mongoose.connect(url, { useUnifiedTopology: true}).then((db) => {       //Connecting Server
    console.log('Connected Successfully');
    Dishes.create({                                              //writing data using Dishes.create
        name: 'Indian Pizza',
        description: 'Cooked and baked with Indian spices'
    }).then((dish) => {                                        
        console.log(dish);
        return Dishes.findByIdAndUpdate(                            //updating a dish
            dish._id,   
            { $set: {description: 'Cooked and Smoked with Indian spices'}},
            { new: true}
        ).exec();
    }).then((dish) => {
        console.log(dish);
        dish.comments.push({                                        //adding a comment to dish
            rating: 4,
            comment: 'Best pizza EVER made',
            author: 'Harshit'
        });
        return dish.save();                                           //saving data
    }).then((dish) => {
        console.log(dish);
        return Dishes.deleteOne({});                                   //deleting a dish
    }).then(() => {
        mongoose.connection.close().catch((err) => console.log(err))    //closing connection
    });
});
    