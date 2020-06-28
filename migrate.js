let mysql = require('mysql');
let mongo = require('mongodb');
var url = "mongodb://localhost:27017/";


var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database:"db"
  });
  
mysqlConnection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to mysql !");
});
  
mongo.connect(url, function(err, db) {
    var mongodatabase = db.db("acme");
    if (err) throw err;
    let arr = [];

    //edit the query to match your needs .
    mysqlConnection.query("select * from permissions",function(err,result){
        for (const key in result) {
            //edit the object to match your needs 
            arr[key] = { name: result[key].name, address: result[key].name };
        }
        mongodatabase.collection("mongoCollection").insertMany(arr, function(err) {
            if (err) throw err;
            console.log("Records inserted !");
            db.close();
            mysqlConnection.destroy();
        });   
    });  
}); 