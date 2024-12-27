import { useState } from 'react';
import axios from 'axios';

function Form() {
    const [originalUrl, setOriginalUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.BASE_URL}/api/shorten`, { originalUrl });
            alert(`Shortened URL: ${response.data.shortUrl}`);
            setOriginalUrl('');
        } catch (error) {
            console.error('Error creating shortened URL:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="Enter URL to shorten"
                required
            />
            <button type="submit">Shorten URL</button>
        </form>
    );
}

export default Form;
