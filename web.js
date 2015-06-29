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

		console.log('******Received money as: ' + request.query.money);

		var firstName = request.query.firstname;
		var lastName = request.query.lastname;
		var money = request.query.money;
		var teamid = 'a03j0000001P7Yh';

		/*client.query('INSERT into salesforce.follower__c (FirstName__c, LastName__c, Money_Donated__c, Team__c) VALUES ($1, $2, $3, $4)', [firstName, lastName, money, teamid],
		//client.query('INSERT INTO salesforce.contact (FirstName, LastName) VALUES ($1, $2)', [firstName, lastName],
		function(err, result)
		{
			if (err)
			{
		    	console.log(err);
		    } else {
		    	console.log('************row inserted');
				response.redirect('/');
			}

	  });
 });*/
});





var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
