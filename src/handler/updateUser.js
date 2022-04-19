"use strict"

const AWS = require("aws-sdk")
const uuid = require("uuid")

const dynamodb = new AWS.DynamoDB.DocumentClient()

module.exports.updateUser = (event, context, callback) => {
	console.log(event)

	const datetime = new Date().toISOString()
	const data = JSON.parse(event.body)

	if (typeof data.nome !== "string") {
		console.error("Nome não é uma string")
		const response = {
			statusCode: 400,
			body: JSON.stringify({ message: "Nome não é uma string" }),
		}
	}

	const params = {
		TableName: process.env.DYNAMODB_USER_TABLE_NAME,
		Key: {
			id: event.pathParameters.id,
		},
		ExpressionAttributeValues: {
			":n": data.nome,
			":e": data.email,
			":u": datetime,
		},
		UpdateExpression: "set nome = :n, email = :e, updatedAt = :u",
	}

	dynamodb.update(params, (error, data) => {
		if (error) {
			console.error(error)
			callback(new Error(error))
			return
		}

		const response = {
			statusCode: 200,
			body: JSON.stringify(data.Item),
		}

		callback(null, response)
	})
}
