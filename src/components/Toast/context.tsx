import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { Toast } from '../Toast';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
    id: string;
    message: string;
    type: ToastType;
}

export interface ToastContextType {
    addToast: (message: string, type?: ToastType) => void;
    removeToast: (id: string) => void;
}


const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider= ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const addToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <div className="toast-container">
            {toasts.map((toast) => (
                <Toast 
                key={toast.id} 
                message={toast.message}
                onClose={() => removeToast(toast.id)} 
                />
            ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('Oops! Seems like UseToast is not being used within a ToastProvider');
    }
    return context;
};