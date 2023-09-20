import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

    const toggleAddTaskModal = () => {
        setIsAddTaskOpen(!isAddTaskOpen);
    };

    return (
        <ModalContext.Provider value={{ isAddTaskOpen, toggleAddTaskModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    return useContext(ModalContext);
};
