'use client'

import { useAuth } from '@/hooks/context/isLogined';
import { useModal } from '@/hooks/context/modal';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
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

  const handleConfirm = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('images', selectedFile);

      try {
        const response = await axios.post('/api/image/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });

        const imageUrl = response.data;
        console.log(imageUrl)

        closeModal();
      } catch (error) {
      }
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
        className='mx-auto w-[500px] h-[800px] overflow-hidden bg-white flex flex-col justify-between'
        style={{
          backgroundColor: 'white',
          opacity: '1',
          zIndex: 210,
        }}
      >
        <div className='flex items-center justify-between p-[40px]'>
          <span className='text-black text-[20px] font-bold'>이미지 업로드</span>
          <button onClick={closeModal} className='text-black text-[20px] font-bold'><FontAwesomeIcon icon={faX} /></button>
        </div>
        <div className='w-[100%] h-[80%] p-[40px] flex flex-col items-center justify-between gap-[20px]'>
          {selectedFile ? (
            <Image
              src={URL.createObjectURL(selectedFile)}
              alt='SelectedProfileImage'
              width={500}
              height={500}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}/>
            ) : (
            <Image 
              src={photo}
              alt='OriginalProfileImage'
              width={500}
              height={500}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          )}
          <div className='flex items-center justify-between gap-[20px] w-[100%]'>
            <input type='file' accept='image/*' onChange={handleFileChange} ref={fileInputRef} className='hidden' id='fileInput' />
            {selectedFile ? (
              <div className='text-black font-bold overflow-hidden max-w-full'>
                <span
                  className='truncate'
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    WebkitLineClamp: 1,
                  }}
                >
                  {selectedFile.name.length > 20
                    ? `${selectedFile.name.substring(0, 20)}...${selectedFile.name.split('.').pop()}`
                    : selectedFile.name
                  }
                </span>
              </div>
            ) : (
              <div className='text-black font-bold overflow-hidden max-w-full'>
                <span
                  className='truncate'
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    WebkitLineClamp: 1,
                  }}
                >
                  파일을 추가(선택)해 주세요.
                </span>
              </div>
            )}
            <label htmlFor='fileInput' className='cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md r-0'>
              파일 선택
            </label>  
          </div>
        </div>
      <div className='w-[100%] h-[70px] overflow-hidden flex text-[20px]'>
          <button onClick={closeModal} className='w-[50%] h-[100%] bg-[#333333] font-bold text-white'>닫기</button>
          <button onClick={handleConfirm} className='flex-1 bg-[#111111] font-bold text-white'>확인</button>
        </div>
      </div>
    </div>
  );
};


