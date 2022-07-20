const aws = require('aws-sdk');
aws.config.update({region: 'ap-south-1'});
const db = new aws.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = async (event) => {
    console.log({event});
    const short_id = event.shortid;
    let params = {
        TableName: 'url_shortner',
        Key: {
            short_url: { S: short_id}
        }
    }

    try {
        const data = await db.getItem(params).promise();
        if(data.$response.data) {
            console.log("SUCCESS");
            return {
                statusCode: 301,
                location: data.Item.long_url.S
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