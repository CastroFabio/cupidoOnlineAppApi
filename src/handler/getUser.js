"use strict"

const AWS = require("aws-sdk")

const dynamodb = new AWS.DynamoDB.DocumentClient()

module.exports.getUser = (event, context, callback) => {
	const params = {
		TableName: process.env.DYNAMODB_USER_TABLE_NAME,
		Key: {
			id: event.pathParameters.id,
		},
	}

	dynamodb.get(params, (error, data) => {
		if (error) {
			console.error(error)
			callback(new Error(error))
			return
		}

		const response = data.Item
			? {
					statusCode: 200,
					body: JSON.stringify(data.Item),
			  }
			: {
					statusCode: 400,
					body: JSON.stringify({ message: "usuário não encontrado" }),
			  }

		callback(null, response)
	})
}
