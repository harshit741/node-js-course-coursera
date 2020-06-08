const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';               //url of db with port
const dbname = 'newDb';
const dboper = require('./operations');                 //requiring operation module

MongoClient.connect(url, { useUnifiedTopology: true }).then((client) => {             //creating connection with server

    console.log('Connected successfully!');
    const db = client.db(dbname);                       //creating connection with db

    //Nested callbacks of operations imported from operation module
    //passed with required parameters to do various operation
    dboper.insertDocs(db, { "name": "Indian Pizza", "description": "Cooked and smoked with spices" },      //Inserting
        "dishes")
    .then((result) => {
        console.log('Insert document\n', result.ops);
        return dboper.findDocs(db, "dishes")                                //Finding
    })
    .then((docs) => {                                                     
        console.log('Found docs:\n', docs);
        return dboper.updateDocs(db, { "name": "Indian Pizza" },            //Updating
        { "description": "Cooked and baked with Indian spices" }, "dishes")
    })
    .then((result) => {                                                  
        console.log('Updated document ', result.result);
        return dboper.findDocs(db, "dishes")                                //Finding
    })
    .then((docs) => {
        console.log('Found update documents :\n', docs);
        return dboper.removeDocs(db, { "name": "Indian Pizza" }, "dishes")      //Removing doc
    })
    .then((result) => {                                                 
        console.log('Removed document\n', result.result);
        return db.dropCollection("dishes")                                      //Droping collection
    })
    .then((result) => {                                                
        console.log('Dropped collection: \n', result);

        client.close();                                                //closing collection
    })
    .catch((err) => console.log(err));
})
.catch((err) => console.log(err));