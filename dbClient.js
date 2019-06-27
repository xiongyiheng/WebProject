var mongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/hw";
var dbase;
var collection;

var lock = true;
mongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err;
    console.log("数据库已创建！");
    dbase = db.db("hw");
    dbase.createCollection("user", function (err, res) {
        if (err) throw err;
        console.log("创建集合！");
    });

    collection = dbase.collection("user");
    console.log('数据库已连接');
    module.exports = collection;
    lock = false;
});

function insertOne(myObj) {
    collection.insertOne(myObj);
}

function find(myObj) {
    return collection.find(myObj);
}

module.exports = {"insertOne": insertOne, "find": find};
