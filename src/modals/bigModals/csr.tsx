'use client'

import { useAuth } from '@/hooks/context/isLogined';
import { useModal } from '@/hooks/context/modal';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

export const PhotoChangeModalComponent = () => {
  const { photo } = useAuth()
  const { closeModal } = useModal();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    setSelectedFile(selected || null);
  };

  const handleConfirm = () => {
    if (selectedFile) {
      // 여기서 선택한 파일을 사용하여 무언가 작업을 수행하고,
      // 예를 들어, 프로필 이미지를 업데이트하는 API를 호출하거나, 상태를 변경할 수 있습니다.
      
      // 예시: setPhoto(URL.createObjectURL(selectedFile));

      // 모달 닫기
      closeModal();
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(18, 18, 18, 0.8)',
        position: 'fixed',
        zIndex: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <div
        className='mx-auto w-[50%] h-[80%] bg-white flex flex-col justify-between'
        style={{
          backgroundColor: 'white',
          opacity: '1',
          zIndex: 210,
          padding: '40px',
          borderRadius: '8px',
        }}
      >
        <div className='flex items-center justify-between '>
          <span className='text-black text-[30px] font-bold'>이미지 업로드</span>
          <button onClick={closeModal} className='text-black text-[30px] font-bold'><FontAwesomeIcon icon={faX} /></button>
        </div>
        <div className='w-[100%] h-[80%] '>
          {selectedFile ? (
            // 선택한 파일이 있을 때는 선택한 파일을 보여줌
            <Image src={URL.createObjectURL(selectedFile)} alt='SelectedProfileImage' width={300} height={300} style={{ width: 'auto', height: 'auto' }} />
          ) : (
            // 선택한 파일이 없을 때는 기존 프로필 이미지를 보여줌
            <Image src={photo} alt='OriginalProfileImage' width={300} height={300} style={{ width: 'auto', height: 'auto' }} />
          )}
          <input type='file' accept='image/*' onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
          <button onClick={() => fileInputRef.current?.click()}>파일 선택</button>
        </div>
        <div className='flex-1 rounded-md overflow-hidden flex text-[25px]'>
          <button onClick={closeModal} className='w-[50%] h-[100%] bg-[#333333] font-bold'>닫기</button>
          <button onClick={handleConfirm} className='flex-1 bg-[#111111] font-bold'>확인</button>
        </div>
      </div>
    </div>
  );
};
