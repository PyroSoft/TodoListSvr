var express = require('express');
var router = express.Router();
var cors = require('cors');

var corsOptions = {
  origin: true, //Let any origin send requests
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

/* GET users listing. */
/*router.get('/', cors(corsOptions),function(req, res, next) {
  var lists= [];
  lists.push({
  	"id":1,
  	"name":"Prueba"
  });

  res.send(lists);
});*/

/* GET List of lists page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('listcollection');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/* POST to Add User Service */
router.post('/addlist', function(req, res) {
    console.log(req.body);
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var listName = req.body.name;

    // Set our collection
    var collection = db.get('listcollection');

    // Submit to the DB
    collection.insert({
        "name" : listName
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.json("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            // res.redirect("userlist");
            res.json("Successfully added");
        }
    });
});

module.exports = router;
