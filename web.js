var express = require('express');
var fs = require('fs');
var pg = require('pg');

var app = express.createServer(express.logger());
app.use(express.static(__dirname + '/images'));
app.get('/', function(request, response) {
    //read the file
    var buffer = new Buffer(fs.readFileSync('index.html'));
    response.send(buffer.toString('utf-8'));
});

app.get('/followteam', function(request, response) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		
		console.log('******Received email as: ' + request.query.firstname);
		
	    client.query('SELECT * FROM test_table', function(err, result) {
	      done();
	      if (err)
	       { 
			   console.error(err); response.send("Error " + err); }
	      else
	       { 
			   response.send(result.rows); }
	    });
	  });
});



var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
