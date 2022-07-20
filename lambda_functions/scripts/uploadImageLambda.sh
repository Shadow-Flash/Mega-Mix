#!/bin/bash

cd ../lambda_functions

rm -rf app.zip

zip app.zip node_modules package-lock.json package.json uploadImage.js

aws lambda update-function-code \
--function-name "upload_image" \
--zip-file "fileb://./app.zip" \
--region "ap-south-1"