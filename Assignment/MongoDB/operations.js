const assert = require('assert');

exports.insertDocs = (db, doc, collection, callback) => {               //exporting the function
    const coll = db.collection(collection);                             //dreating collection variable
    return coll.insertOne(doc);                                         //removing callback functions 
};

exports.findDocs = (db, collection, callback) => {
    const coll = db.collection(collection);
    return coll.find({}).toArray();
};

exports.removeDocs = (db, doc, collection, callback) => {
    const coll = db.collection(collection);
    return coll.deleteOne(doc);
};

exports.updateDocs = (db, doc, update, collection, callback) => {
    const coll = db.collection(collection);
    return coll.updateOne(doc, {$set: update}, null);
};