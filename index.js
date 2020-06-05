const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';               //url of db with port
const dbname = 'newDb';

MongoClient.connect(url, (err, client) => {             //creating connection with server

    assert.equal(err, null);                            //checking for errors
    console.log('Connected successfully!');

    const db = client.db(dbname);                       //creating connection with db
    const collection = db.collection('dishes');         //creating a variable to interact with db and perform operations

    collection.insertOne({"name" : "Italian Pizza",             //inserting data
        "description" : "Spicy pizza from the original discoverers."}, (err, result) => {
            assert.equal(err , null);
            console.log('After Insert\n');
            console.log(result.ops);                    //No. of operations carried out successfully

            collection.find({}).toArray((err, docs) => {   // to show all records in DB
                assert.equal(err, null);
                console.log('Found\n'); 
                console.log(docs);

                db.dropCollection('dishes',(err, result) => {       //drop collection
                    assert.equal(err, null);


                    client.close();
                } ) 
            })
        });

});