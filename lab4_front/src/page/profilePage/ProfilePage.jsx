import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../slice/authSlice";
import {useNavigate} from "react-router-dom";
import {useToast} from "../../component/toast/ToastContext.jsx";
import "../../style/page/Profile.css";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {showToast} = useToast();

    const user = useSelector((state) => state.auth.user);
    const [avatar, setAvatar] = useState(user?.avatar || "/default-avatar.png");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
        showToast("Вы успешно вышли из системы", "success", 2000);
    };

    const handleAvatarUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsLoading(true);
            try {
                
                
                
                showToast("Аватарка успешно загружена", "success", 2000);
            } catch (error) {
                showToast("Ошибка при загрузке аватарки", "error", 3000);
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (isLoading) return <div>Загрузка профиля...</div>;

    return (
        <div className="profile-page">
            <div className="profile-header">
                <h1>Профиль</h1>
                <button onClick={handleLogout} className="logout-button">
                    Выйти
                </button>
            </div>

            <div className="profile-content">
                <div className="profile-info">
                    <div className="avatar">
                        <img src={avatar} alt="Аватар"/>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            disabled={isLoading}
                            style={{display: "none"}}
                            id="avatar-upload"
                        />
                        <label htmlFor="avatar-upload" className="upload-label">
                            {isLoading ? "Загрузка..." : "Изменить аватар"}
                        </label>
                    </div>
                    <div className="details">
                        <h2>{user?.username}</h2>
                        <p>Email: {user?.email}</p>
                        <p>ID: {user?.id}</p>
                        <p>Зарегистрирован: {new Date(user?.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;