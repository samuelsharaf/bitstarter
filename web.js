var express = require('express');
var fs = require('fs');

var app = express.createServer(express.logger());
app.use(express.static(__dirname + '/images'));
app.get('/', function(request, response) {
    //read the file
    var buffer = new Buffer(fs.readFileSync('index.html'));
    response.send(buffer.toString('utf-8'));
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
