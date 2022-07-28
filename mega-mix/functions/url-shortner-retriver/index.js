const aws = require('aws-sdk');
aws.config.update({region: 'ap-south-1'});
const db = new aws.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = async (event) => {
    console.log({event});
    const url_id = event["pathParameters"]["urlID"];
    let params = {
        TableName: 'vg-sam',
        Key: {
            urlID: { S: url_id}
        }
    }
    try {
        const data = await db.getItem(params).promise();
        console.log("SUCCESS");
        let get_url = data.Item.long_url.S;
        let response = {
            statusCode: 301,
            headers: {
                Location: get_url
            },
        }
        
        return response;
    }
    catch (err) {
        console.log("ERROR",err);
        return {
            statusCode: 404,
            headers: {
                "my_header": "my_value",
                'Content-Type': 'application/json'
            },
            isBase64Encoded: false,
            body: JSON.stringify(err)
        }
    }
};