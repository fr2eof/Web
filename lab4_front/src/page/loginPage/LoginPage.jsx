import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {loginSuccess} from "../../slice/authSlice";
import {Link, useNavigate} from "react-router-dom";
import {useToast} from "../../component/toast/ToastContext.jsx";
import '../../style/page/Auth.css';
import {useLoginUserMutation} from "../../api/authApi.js";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {showToast} = useToast();

    const [loginUser, {isLoading: isLoginLoading, error: loginError}] = useLoginUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            password,
        };

        try {
            const response = await loginUser(userData).unwrap();
            const {userId, accessToken, refreshToken} = response;

            dispatch(loginSuccess({userId, username, accessToken, refreshToken}));

            navigate("/main");

            showToast("Вход выполнен успешно!", "success", 2000);
        } catch (error) {
            console.error("Ошибка:", error);
            showToast(loginError?.data?.message || "Ошибка при входе", "error", 3000);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-content">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isLoginLoading}>
                            {isLoginLoading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>
                <p className="auth-link">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;