import React from 'react';
import { useGetImageQuery } from '../../api/imageApi.js';

const DisplayImage = ({ imagePath }) => {
    const { data, error, isLoading } = useGetImageQuery(imagePath);

    if (isLoading) return <div>Loading image...</div>;
    if (error) return <div>Failed to load image.</div>;

    return (
        <div>
            <h2>Image</h2>
            <img src={URL.createObjectURL(data)} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
    );
};

export default DisplayImage;