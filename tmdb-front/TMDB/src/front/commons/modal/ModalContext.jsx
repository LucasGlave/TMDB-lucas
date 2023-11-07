import React, { createContext, useContext, useState } from "react";
import "./modal.scss";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const openModal = (content) => {
    setModalAbierto(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setModalAbierto(false);
    setModalContent({});
  };

  return (
    <ModalContext.Provider
      value={{ modalAbierto, modalContent, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
