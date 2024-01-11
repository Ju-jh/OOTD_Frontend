'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PhotoChangeModalComponent } from '@/modals/bigModals/csr';

interface ModalContext {
  isModalOpen: boolean;
  modalContent: string;
  openModal: (content: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContext | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const pathname = usePathname()

  const openModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent('');
    setIsModalOpen(false);
  };

  useEffect(() => {

    closeModal();

  }, [pathname]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.position = 'fixed';
      document.body.style.left = '0';
      document.body.style.top = '0';
      document.body.style.right = '0';
      document.body.style.bottom = '0';
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.left = '';
      document.body.style.top = '';
      document.body.style.right = '';
      document.body.style.bottom = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.position = '';
      document.body.style.left = '';
      document.body.style.top = '';
      document.body.style.right = '';
      document.body.style.bottom = '';
      document.body.style.width = '';
    };
  }, [isModalOpen]);

  const contextValue: ModalContext = {
    isModalOpen,
    modalContent,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {modalContent === 'photoChange' && <PhotoChangeModalComponent />}
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
