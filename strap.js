$(function() {
	$.getJSON('/park', function(data) {
		let client = new Twilio.sync.client(data.token);

		//console.log(JSON.stringify(data));

		client.document('car parking document').then(function(doc) {
			doc.on('updated', function(data) {
				console.log('Document updated!', data);
			});
		});
	});
}());
