$(function() {
	$.getJSON('/token', function(data) {
		let client = new Twilio.Sync.Client(data.token);
		console.log(data);
		console.log(client);
		//console.log(JSON.stringify(data));


		client.document('car_parking_document').then(function(doc) {
			doc.on('updated', function(data) {
				console.log('Document updated: ' + data);
			});
		}).catch(function(err) {
			console.log(`err: ${err}`);
			$('#mainContent').html('We were unable to resolve your request. Sorry!');
		})
	});
}());
