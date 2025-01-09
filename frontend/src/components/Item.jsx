import { useState } from 'react';
import axios from 'axios';

function Item({ url, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUrl, setEditedUrl] = useState(url.originalUrl);

    const handleUpdate = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_APP}/api/url/${url.shortUrl}`, { originalUrl: editedUrl });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating URL:', error);
        }
    };


    return (
        <div>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedUrl}
                        onChange={(e) => setEditedUrl(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <p>Original: <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">{url.originalUrl}</a></p>
                    <p>{/* Short: {import.meta.env.VITE_APP}/api/url/{url.shortUrl} */}
                    <a href={`${import.meta.env.VITE_APP}/api/url/${url.shortUrl}`} target="_blank" rel="noopener noreferrer">Short: {url.shortUrl}</a>
                    </p>
                    <p>Clicks: {url.clicks}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => onDelete(url.shortUrl)}>Delete</button>
                </>
            )}
        </div>
    );
}

export default Item;
