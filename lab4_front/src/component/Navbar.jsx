import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import Clock from "./Clock.jsx";
import {ThemeContext} from "../theme/ThemeContext.jsx";
import "../style/component/Navbar.css";


function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const {isDarkMode, toggleTheme} = useContext(ThemeContext);


    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="https://github.com/fr2eof" target="_blank" rel="noopener noreferrer">
                    Ivanov Ilya
                </a>
            </div>

            <ul className="navbar-links">
                <li>
                    <button onClick={toggleTheme}>
                        {isDarkMode ? "🌞" : "🌙"}
                    </button>
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/main">Main</Link>
                </li>
                <li>
                    <Clock/>
                </li>
                <li>
                    <Link to={isLoggedIn ? "/profile" : "/login"}>
                        <img
                            src={user?.avatar || "../../resources/default-avatar.jpeg"}
                            alt="Profile"
                            className="profile-avatar"
                        />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;