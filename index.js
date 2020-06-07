const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';               //url of db with port
const dbname = 'newDb';
const dboper = require('./operations');                 //requiring operation module

MongoClient.connect(url, (err, client) => {             //creating connection with server

    assert.equal(err, null);                            //checking for errors
    console.log('Connected successfully!');

    const db = client.db(dbname);                       //creating connection with db

    //Nested callbacks of operations imported from operation module
    //passed with required parameters to do various operation
    dboper.insertDocs(db, {"name" : "Indian Pizza" , "description" : "Cooked and smoked with spices"},      //Inserting
     "dishes", (result) => { 
        console.log('Insert document\n', result.ops);

        dboper.findDocs(db, "dishes", (docs) => {                                                           //Finding
            console.log('Found docs:\n' + docs);

            dboper.updateDocs(db, {"name" : "Indian Pizza"}, {"description" : "Cooked and baked with Indian spices"},
            "dishes", (result) => {                                                                         //Updating
                console.log('Updated document ' , result.result);

                dboper.findDocs(db, "dishes", (docs) => {
                    console.log('Found update documents :\n' , docs);

                    dboper.removeDocs(db, {"name" : "Indian Pizza"}, "dishes", (result) => {                //Removing doc
                        console.log('Removed document\n' , result.result);

                        db.dropCollection("dishes", (result) => {                                           //Droping collection
                            console.log('Dropped collection: \n', result);
                            client.close();                                                                 //closing collection
                        })
                    });
                });
            });
        });
    });
});
