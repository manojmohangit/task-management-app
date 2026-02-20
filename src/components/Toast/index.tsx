import { useEffect } from "react";
import type { ToastType } from "./context";
import "./index.css"

interface ToastProps {
    message: string;
    duration?: number;
    type?: ToastType;
    onClose?: () => void;
}

export const Toast = ({message, duration = 2000, type="success", onClose = (): void => {}}: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose?.();
        }, duration);
        
        return () => clearTimeout(timer);
    }, [duration]);

    return (
        <div className={`toast slide-up ${type}`} >
            {type === "success" ? <i className={`bi bi-check-circle-fill mr-1 ${type}`}></i> : <i className={`bi bi-x-circle-fill toast-icon mr-1 ${type}`}></i>}
            {message}
        </div>
    );
}