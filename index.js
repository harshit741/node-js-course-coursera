const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/newDb';

mongoose.connect(url, { useUnifiedTopology: true}).then((db) => {       //Connecting Server
    console.log('Connected Successfully');
    var newDish = Dishes({                                              //writing data
        name: 'Indian Pizza',
        description: 'Cooked and baked with Indian spices'
    });
    newDish.save().then((dishes) => {                                   //saving data
        console.log(dishes);
        return Dishes.find({});
    }).then((dishes) => {
        console.log(dishes);
        return Dishes.deleteMany({});
    }).then(() => {
        mongoose.connection.close().catch((err) => console.log(err))    //closing connection
    });
});