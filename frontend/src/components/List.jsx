import { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';


function List() {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        fetchUrls();
    }, []);
    const fetchUrls = async () => {
        try {
            const response = await axios.get(`${import.meta.env.BASE_URL}/api/url/getall`);
            setUrls(response.data);
        } catch (error) {
            console.error('Error fetching URLs:', error);
        }
    };
    const handleDelete = async (shortUrl) => {
        try {
            await axios.delete(`${import.meta.env.BASE_URL}/api/url/${shortUrl}`);
            fetchUrls();
        } catch (error) {
            console.error('Error deleting URL:', error);
        }
    };

    return (
        <div>
            <h2>Shortened URLs</h2>
            {urls.map(url => (
                <Item key={url.shortUrl} url={url} onDelete={handleDelete} />
            ))}
        </div>
    );
}


export default List;
