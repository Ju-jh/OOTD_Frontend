'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CardInstallmentComponent, DeliveryInformationComponent, PhoneNumberChangeModalComponent, PhotoChangeModalComponent, ProductInformationComponent, RefundInformationComponent } from '@/modals/bigModals/csr';
import { CheckingModalComponent } from '@/modals/alertModals/csr';

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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.position = '';
      document.body.style.left = '';
      document.body.style.top = '';
      document.body.style.right = '';
      document.body.style.bottom = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.position = '';
      document.body.style.left = '';
      document.body.style.top = '';
      document.body.style.right = '';
      document.body.style.bottom = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
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
      {modalContent === 'phoneNumberChange' && <PhoneNumberChangeModalComponent />}
      {modalContent === 'checkingModalComponent' && <CheckingModalComponent/>} 
      {modalContent === 'ProductInformation' && <ProductInformationComponent />}
      {modalContent === 'DeliveryInformationComponent' && <DeliveryInformationComponent />}
      {modalContent === 'RefundInformationComponent' && <RefundInformationComponent />}
      {modalContent === 'CardInstallmentComponent' && <CardInstallmentComponent />}
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
