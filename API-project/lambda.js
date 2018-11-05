let AWS = require('aws-sdk');
const sns = new AWS.SNS();
exports.handler = function (event, context, callback) {

	let receiver = event['+31616203400'];
	let sender = event['MySLAPPFORGETEST'];
	let message = event['THIS IS THE CONTENT OF THE MESSAGE TEST'];

	let isPromotional = true;

	console.log("Sending message", message, "to receiver", receiver);

	sns.publish({
		Message: message,
		MessageAttributes: {
			'AWS.SNS.SMS.SMSType': {
				DataType: 'String',
				StringValue: 'Promotional'
			},
			'AWS.SNS.SMS.SenderID': {
				DataType: 'String',
				StringValue: sender
			},
		},
		PhoneNumber: receiver
	}).promise()
		.then(data => {
			console.log("Sent message to", receiver);
			callback(null, data);
		})
		.catch(err => {
			console.log("Sending failed", err);
			callback(err);
		});
}