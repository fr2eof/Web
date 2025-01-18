import React from 'react';
import { useDeleteImageMutation } from '../../api/imageApi.js';

const DeleteImage = ({ imagePath }) => {
    const [deleteImage, { isLoading, isError, isSuccess }] = useDeleteImageMutation();

    const handleDelete = async () => {
        try {
            const result = await deleteImage(imagePath).unwrap();
            console.log(result);
            alert(result);
        } catch (error) {
            console.error("Failed to delete image:", error);
            alert("Failed to delete image");
        }
    };

    return (
        <div>
            <h2>Delete Image</h2>
            <button onClick={handleDelete} disabled={isLoading}>
                {isLoading ? "Deleting..." : "Delete Image"}
            </button>
            {isSuccess && <p>Image deleted successfully!</p>}
            {isError && <p style={{ color: 'red' }}>Failed to delete image.</p>}
        </div>
    );
};

export default DeleteImage;