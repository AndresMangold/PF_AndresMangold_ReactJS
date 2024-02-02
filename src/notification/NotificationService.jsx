import { createContext, useContext } from "react";
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

export const showBootstrapAlert = (type, message) => {
    const alertElement = document.createElement('div');
    alertElement.classList.add('alert', `alert-${type}`);
    alertElement.textContent = message;
  
    const messagesContainer = document.getElementById('messages-container');
    messagesContainer.appendChild(alertElement);
  
    setTimeout(() => {
      alertElement.remove();
    }, 3000);
  };