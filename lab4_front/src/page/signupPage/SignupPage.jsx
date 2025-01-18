import React, {useState} from "react";
import {useSignupUserMutation} from "../../api/authApi.js";
import {Link, useNavigate} from "react-router-dom";
import {useToast} from "../../component/toast/ToastContext.jsx";
import '../../style/page/Auth.css';
import {loginSuccess} from "../../slice/authSlice.js";
import {useDispatch} from "react-redux";

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const {showToast} = useToast();

    const [signupUser, {isLoading: isSignupLoading, isError: isSignupError, error: signupError}] =
        useSignupUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            password,
            email,
        };

        try {
            const response = await signupUser(userData).unwrap();
            const {userId, accessToken, refreshToken} = response;

            dispatch(loginSuccess({userId, username, accessToken, refreshToken}));
            navigate("/main");

            showToast("Регистрация прошла успешно!", "success", 2000);
        } catch (error) {
            console.error("Ошибка:", error);
            showToast(signupError?.data?.message || "Ошибка при регистрации", "error", 3000);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-content">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <input
                        type="text"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        minLength={3}
                        maxLength={20}
                        pattern="^[a-zA-Z0-9_]+$"
                        title="Username must be alphanumeric with underscores"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        title="Please enter a valid email address (e.g., user@example.com)"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={8}
                        title="Password must be at least 8 characters long"
                    />
                    <button type="submit" disabled={isSignupLoading}>
                        {isSignupLoading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;