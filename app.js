var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');


var path = __dirname + '/views/';
var path2 = __dirname + '/views/';




app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
var live_events;
var gps1;
var gps2;


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: 'drishtilive'
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//keep connection alive
setInterval(function () {
    con.query('SELECT 1');
}, 5000);


con.query("SELECT name FROM drishtilive", function(err, result, fields) {
  if (err) throw err;
  console.log(result);
  live_events = result;
});



app.use('/', router);
app.use(express.static(path2));


router.get('/', function(req, res) {

  res.render(path + 'index', {
    live_events: live_events
  });
});

router.get('/live', function(req, res) {

  var event_recived = req.query.name;
  console.log("sucees"+event_recived);

  con.query("SELECT gps1,gps2 FROM drishtilive where name='" + event_recived + "'", function(err, result, fields) {
    if (err) throw err;
    //console.log(result);
    for (var i = 0; i < result.length; i++) {
      var row = result[i];
      //console.log(row.gps1);
      gps1=row.gps1;
      gps2=row.gps2;
    }
    //gps1=result.gps1;
    res.render(path + 'map',{
     gps1 : gps1,
     gps2 : gps2
    });
  });
  //console.log(gps);

});


router.get('/selected', function(req, res) {

  var event_recived = req.query.name;
  console.log(event_recived);

  con.query("SELECT gps1,gps2 FROM drishtilive where name='" + event_recived + "'", function(err, result, fields) {
    if (err) throw err;
    //console.log(result);
    for (var i = 0; i < result.length; i++) {
      var row = result[i];
      //console.log(row.gps1);
      gps1=row.gps1;
      gps2=row.gps2;
    }
    //gps1=result.gps1;
    res.render(path + 'map',{
     gps1 : gps1,
     gps2 : gps2
    });
  });
  //console.log(gps);

});

router.get('/search', function(req, res) {
  console.log("working" + req.query.key);
  con.query("SELECT name FROM drishtilive WHERE name LIKE '%"+req.query.key+"%'",
    function(err, rows, fields) {
      if (err) throw err;
      var data = [];
      console.log(rows);
      for (i = 0; i < rows.length; i++) {
        data.push(rows[i].name);
      }
      res.end(JSON.stringify(data));
    });
});



app.use('*', function(req, res) {
  res.send('Error 404: Not Found!');
});






app.listen(3000, function() {
  console.log("listening on port 3000");
})
