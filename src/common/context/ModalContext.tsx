import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ModalContextType {
  activeModal: string | null;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  closeAllModals: () => void;
  isModalOpen: (modalId: string) => boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
 
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modalId: string) => {
    setActiveModal(modalId);
  };

  const closeModal = (modalId: string) => {
    if (activeModal === modalId) {
      setActiveModal(null);
    }
  };

  const closeAllModals = () => {
    setActiveModal(null);
  };

  const isModalOpen = (modalId: string) => {
    return activeModal === modalId;
  };

  return (
    <ModalContext.Provider value={{
      activeModal,
      openModal,
      closeModal,
      closeAllModals,
      isModalOpen
    }}>
      {children}
    </ModalContext.Provider>
  );
};
