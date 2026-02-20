import { useEffect } from "react";
import type { ToastType } from "./context";
import "./index.scss"

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
        <div className={`toast slide-in ${type}`} >
            <p>{message}</p>
        </div>
    );
}