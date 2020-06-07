const assert = require('assert');

exports.insertDocs = (db, doc, collection, callback) => {               //exporting the function
    const coll = db.collection(collection);                             //dreating collection variable
    coll.insertOne(doc, (err, result) => {                              //insert function with a callback func.
        assert.equal(err, null);
        console.log(`Inserted ${result.result.n} into ${collection}`);
        callback(result);                                               
    });
};

exports.findDocs = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        callback(docs);
    });
};

exports.removeDocs = (db, doc, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(doc, (err, result) => {
        assert.equal(err, null);
        console.log('Removed the document ', doc);
        callback(result);
    });
};

exports.updateDocs = (db, doc, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(doc, {$set: update}, null, (err, result) => {
        assert.equal(err, null);
        console.log("Updated the document with ", update    );
        callback(result);
    });
};