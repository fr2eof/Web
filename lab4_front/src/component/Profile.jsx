import React from "react";
import "../style/page/Profile.css";

const ProfileModal = ({ onClose, onLogout, user }) => {
    return (
        <div className="profile-modal">
            <div className="profile-modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Profile</h2>
                {user ? (
                    <>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                    </>
                ) : (
                    <p>No user data available</p>
                )}
                <button onClick={onLogout}>Logout</button>
            </div>
        </div>
    );
};

export default ProfileModal;