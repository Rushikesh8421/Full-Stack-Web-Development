const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://locahost:27017"

const dbName = 'fruitDB';

const client = new MongoClient(url);

client.connect(function(err){
    assert.equal(null,err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    
    client.close();
})