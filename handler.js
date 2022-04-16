"use strict"

module.exports.hello = (event, context, callback) => {
	console.log(event)

	const response = {
		statusCode: 200,
		body: JSON.stringify({
			message: "API GATEWAY WAS CALLED",
			input: event,
		}),
	}

	callback(null, response)
}
