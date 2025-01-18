import React from "react";
import { useToast } from "./ToastContext";
import "../../style/component/Toast.css";

const Toast = () => {
    const { toast } = useToast();

    if (!toast.isVisible) return null;

    const getIcon = () => {
        switch (toast.type) {
            case "success":
                return "✅";
            case "error":
                return "❌";
            case "warning":
                return "⚠️";
            case "info":
                return "ℹ️";
            default:
                return "🔔";
        }
    };

    return (
        <div className={`toast ${toast.type}`}>
            <span className="icon">{getIcon()}</span>
            {toast.message}
        </div>
    );
};

export default Toast;