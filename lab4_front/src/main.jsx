import React, {StrictMode, Suspense, lazy, useEffect, useContext} from "react";
import {createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";
import "./style/page/Home.css";
import "./style/variables.css";
import {ThemeProvider, ThemeContext} from "./theme/ThemeContext.jsx";
import {ToastProvider} from "./component/toast/ToastContext";
import PrivateRoute from "./component/PrivateRoute.jsx";

const Toast = lazy(() => import("./component/toast/Toast.jsx"));
const HomePage = lazy(() => import("./page/homePage/HomePage.jsx"));
const MainPage = lazy(() => import("./page/mainPage/MainPage.jsx"));
const LoginPage = lazy(() => import("./page/loginPage/LoginPage.jsx"));
const SignupPage = lazy(() => import("./page/signupPage/SignupPage.jsx"));
const ProfilePage = lazy(() => import("./page/profilePage/ProfilePage.jsx"));

const ThemeApplier = ({children}) => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("ThemeApplier must be used within a ThemeProvider");
    }
    const {isDarkMode} = context;

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            isDarkMode ? "dark" : "light"
        );
    }, [isDarkMode]);

    return children;
};

const Layout = () => (
    <ThemeApplier>
        <div className="app-container">
            <Navbar/>
            <main className="main-content">
                <Outlet/>
            </main>
            <Footer/>
            <Toast/>
        </div>
    </ThemeApplier>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <HomePage/>,
            },
            {
                path: "/login",
                element: <LoginPage/>,
            },
            {
                path: "/signup",
                element: <SignupPage/>,
            },
            {
                element: <PrivateRoute/>,
                children: [
                    {
                        path: "/main",
                        element: <MainPage/>,
                    },
                    {
                        path: "/profile",
                        element: <ProfilePage/>,
                    },
                ],
            },
        ],
    },
]);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Element 'root' not found in DOM");

createRoot(rootElement).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <ToastProvider>
                    <Suspense fallback={<div>Loading...</div>}>
                        <RouterProvider router={router}/>
                    </Suspense>
                </ToastProvider>
            </ThemeProvider>
        </Provider>
    </StrictMode>
);