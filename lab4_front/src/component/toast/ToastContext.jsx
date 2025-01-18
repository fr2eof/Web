import React, { createContext, useState, useContext } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({
        message: "",
        type: "info", 
        isVisible: false,
    });

    const showToast = (message, type = "info", duration = 3000) => {
        setToast({ message, type, isVisible: true });

        setTimeout(() => {
            setToast({ message: "", type: "info", isVisible: false });
        }, duration);
    };

    return (
        <ToastContext.Provider value={{ toast, showToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};