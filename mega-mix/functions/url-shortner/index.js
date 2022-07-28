const aws = require('aws-sdk');
aws.config.update({region: 'ap-south-1'});
const db = new aws.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = async (event) => {
    const baseUrl = process.env.APP_URL;
    const longUrl = JSON.parse(event.body).longUrl;
    let shortUrl = Math.floor(Math.random()+Date.now()).toString();
    let params = {
        TableName: 'vg-sam',
        Item: {
            'long_url': { 'S': longUrl},
            'urlID': { 'S': shortUrl}
        }
    }
    let shortURL = baseUrl+shortUrl;
    try {
        const data = await db.putItem(params).promise();
        if(data.$response.data) {
            console.log("SUCCESS");
            return {
                statusCode: 200,
                headers: {
                    "my_header": "my_value",
                    "Access-Control-Allow-Headers" : "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST,OPTIONS",
                    "Access-Control-Allow-Credentials" : "true",
                    'Content-Type': 'application/json'
                },
                isBase64Encoded: false,
                body: JSON.stringify(shortURL)
            }
        }
        else {
            console.log("ERROR",data.$response.error);
            return {
                statusCode: 400,
                headers: {
                    "my_header": "my_value",
                    "Access-Control-Allow-Headers" : "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Credentials" : "true",
                    'Content-Type': 'application/json'
                },
                isBase64Encoded: false,
                body: JSON.stringify(data.$response.error)
            }
        }
    }
    catch (err) {
        console.log("ERROR",err);
        return {
            statusCode: 400,
            headers: {
                "my_header": "my_value",
                    "Access-Control-Allow-Headers" : "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Credentials" : "true",
                    'Content-Type': 'application/json'
            },
            isBase64Encoded: false,
            body: JSON.stringify(err)
        }
    }
};