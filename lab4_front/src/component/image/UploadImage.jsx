import React, { useState } from 'react';
import { useUploadImageMutation } from '../../api/imageApi.js';

const UploadImage = () => {
    const [uploadImage, { isLoading, isError, isSuccess }] = useUploadImageMutation();
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const result = await uploadImage(file).unwrap();
                console.log(result); 
                alert(result);
            } catch (error) {
                console.error("Failed to upload image:", error);
                alert("Failed to upload image");
            }
        }
    };

    return (
        <div>
            <h2>Upload Image</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} required />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Uploading..." : "Upload"}
                </button>
            </form>
            {isSuccess && <p>Image uploaded successfully!</p>}
            {isError && <p style={{ color: 'red' }}>Failed to upload image.</p>}
        </div>
    );
};

export default UploadImage;