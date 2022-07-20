const aws = require('aws-sdk');
aws.config.update({region: 'ap-south-1'});
const s3 = new aws.S3({apiVersion: '2006-03-01'});

exports.handler = async (event) => {
    let file = Buffer.from(event.content.replace(/^data:image\/\w+;base64,/, ""),"base64");
    let params = {
        Bucket: 'mega-mix-project',
        Key: Math.floor(Math.random()+Date.now()).toString()+'.jpg',
        Body: file,
        ContentType: "image/jpeg"
    }
    
    try {
        const data = await s3.upload(params).promise();
        if(data.Location) {
            console.log("SUCCESS");
            return {
                statusCode: 200,
                headers: {
                    "my_header": "my_value",
                    'Content-Type': 'application/json'
                },
                isBase64Encoded: false,
                body: JSON.stringify(data.Location),
            }
        }
        else {
            console.log("ERROR");
            return {
                statusCode: 400,
                error: data
            }
        }
    }
    catch(err) {
        return {
            statusCode: 400,
            error: err
        }
    }
};