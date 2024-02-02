import { useState, createContext, useContext } from "react";
import Swal from 'sweetalert2';

const NotificationContext = createContext({
    showNotification: () => {}
})

export const NotificationProvider = ({ children }) => {
    const showNotification = (type, text) => {
        if (type === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text,
                confirmButtonText: 'OK'
            });
        } else if (type === 'error') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text,
                confirmButtonText: 'OK'
            });
        } else if (type === 'warning') {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text,
                confirmButtonText: 'OK'
            });
        } else if (type === 'info') {
            Swal.fire({
                icon: 'info',
                title: 'Info',
                text,
                confirmButtonText: 'OK'
            });
        }
    }

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            { children }
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    return useContext(NotificationContext)
}
