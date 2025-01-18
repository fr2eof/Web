import React from "react";
import Clicker from "./component/Clicker.jsx";
import Toast from "../../component/toast/Toast.jsx";

const HomePage = () => {
    return (
        <div>
            <div>
                <h1 style={{textAlign: 'center'}}>Welcome to the main page!</h1>
            </div>
            <div>
                <h2 style={{textAlign: 'center'}}>Train your aim, bro</h2>
            </div>
            <Clicker/>
            <Toast/>
        </div>
    );
};

export default HomePage;