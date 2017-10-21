require('dotenv').load();


const Twilio = require('twilio').Twilio;
const express = require('express');

const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.AUTH_TOKEN);
const service = client.sync.services('IS1ba23e1f2037da8dedca06772293d33e');
//require('twilio')(apiKey, apiSecret, {accountSid: accountSid});
let AccessToken = require('twilio').jwt.AccessToken;
let SyncGrant = AccessToken.SyncGrant;

let expressApp = express();
let requestID = (function() {
	let id = 0;

	return {
		generate() {
			id++;
			return this.toString();
		},
		toString() {
			let strID = "" + id;
			return `${"0".repeat(process.env.REQUEST_ID_LENGTH - strID.length)}${strID}`;
		}
	}
}());
//let id = 0;


//expressApp.use(express.static(__dirname + "/landing"));
expressApp.use(express.static(__dirname));

expressApp.get('/token', function(req, res) {
	let syncGrant = new SyncGrant({
		serviceSid: process.env.TWILIO_SYNC_SERVICE_SID,
	});

	var token = new AccessToken(
		process.env.TWILIO_ACCOUNT_SID,
		process.env.TWILIO_API_KEY,
		process.env.TWILIO_API_SECRET
		);

	token.addGrant(syncGrant);

	res.send({
		//identity: requestID.generate(),
		token: token.toJwt(),
	});
	//res.write(express.static(__dirname + '/index.html'));

	/*client.document('car parking document').then(function(doc) {
		doc.on('updated', function(data) {
			console.log('Document updated!', data);
		});
	});*/
});

expressApp.get('/', function(req, res) {
	res.sendFile('\\index.html');
});

let port = process.env.PORT || 5000;
expressApp.listen(port, '127.0.0.1', function() {
	console.log(`listening on ${port}`);
});
/*
service.documents.list().then((response) => {
	console.log(response);
});
*/
