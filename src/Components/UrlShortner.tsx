import React, {useState} from "react";

function UrlShortner() {

    const [longUrl, setLongUrl] = useState<String | undefined>();
    const [shortUrl, setShortUrl] = useState<String | undefined>();

    function handleLongUrl(e: React.ChangeEvent<HTMLInputElement>) {
        let link: String = e.target.value; 
        setLongUrl(link);
    }

    function handleShortUrl(): void {
        fetch('https://o0tbxfxrj6.execute-api.ap-south-1.amazonaws.com/url_shortner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({longUrl})
        })
        .then(async (response) => {
            const data: {successCode: Number, data?: String, error?: String} = await response.json();
            if(data.successCode === 400) {
                setShortUrl(data.error);
            }
            else {
                setShortUrl(data.data);
            }
        })
    }

    return (
        <div>
            <h2>
                URL Shortner:
            </h2>
            <div>
                <label htmlFor="longUrl">Paste your URL: </label>
                <input onChange={(e) => handleLongUrl(e)} type={'text'} id="longUrl" name="longUrlPasted" />
                <button onClick={() => handleShortUrl()}>Short It!</button>
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

export default UrlShortner;
