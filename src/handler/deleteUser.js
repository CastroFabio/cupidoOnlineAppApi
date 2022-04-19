"use strict"

const AWS = require("aws-sdk")

const dynamodb = new AWS.DynamoDB.DocumentClient()

module.exports.deleteUser = (event, context, callback) => {
	const params = {
		TableName: process.env.DYNAMODB_USER_TABLE_NAME,
		Key: {
			id: event.pathParameters.id,
		},
	}

	dynamodb.delete(params, (error, data) => {
		if (error) {
			console.error(error)
			callback(new Error(error))
			return
		}

		const response = {
			statusCode: 200,
			body: JSON.stringify({}),
		}

		callback(null, response)
	})
}
