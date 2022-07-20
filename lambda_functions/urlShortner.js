const aws = require('aws-sdk');
aws.config.update({region: 'ap-south-1'});
const db = new aws.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = async (event) => {
    const baseUrl = process.env.APP_URL;
    const { longUrl } = event;
    let shortUrl = Math.floor(Math.random()+Date.now()).toString();
    let params = {
        TableName: 'url_shortner',
        Item: {
            long_url: { S: longUrl},
            short_url: { S: shortUrl}
        }
    }
    let shortURL = baseUrl+shortUrl;
    try {
        const data = await db.putItem(params).promise();
        if(data.$response.data) {
            console.log("SUCCESS");
            return {
                statusCode: 200,
                data: shortURL
            }
        }
        else {
            console.log("ERROR",data.$response.error);
            return {
                statusCode: 400,
                error: data.$response.error
            }
        }
    }
    catch (err) {
        console.log("ERROR",err);
        return {
            statusCode: 400,
            error: err
        }
    }
};