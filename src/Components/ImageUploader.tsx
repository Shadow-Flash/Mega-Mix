import React, {useState} from "react";

function ImageUploader() {

    const [selectedImg, setSelectedImg] = useState<File|undefined>();
    const [shortUrl, setShortUrl] = useState<String | undefined>();

    function handleSelectedFile(e: React.ChangeEvent<HTMLInputElement>) {
        setSelectedImg(e.target.files[0]);
    }

    function handleUploadBtn(): void {
        fetch('https://bf6tln19qj.execute-api.ap-south-1.amazonaws.com/dev/url-ui', {
            method: 'POST',
            headers : {"Content-Type": "image/jpeg"},
            body: selectedImg
        })
        .then(async (response) => {
            const data: String = await response.json();
            setShortUrl(data);  
        })
        .catch(err => {
            setShortUrl(err);
        })
    }

    return (
        <div>
            <h2>
                Image Uploader:
            </h2>
            <div>
                <label htmlFor="file">Select the Image: </label>
                <input onChange={(e) => handleSelectedFile(e)} type={'file'} id="file" name="fileName" accept="image/*"/>
                <button onClick={() => handleUploadBtn()}>Upload It!</button>
                { shortUrl ? 
                    <div>
                        {shortUrl}
                    </div>
                    : null
                }
            </div>
        </div>
    )
};

export default ImageUploader;
