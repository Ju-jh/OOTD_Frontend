'use client'

import { WITHDRAWAL } from '@/constants/endpoint';
import { Home_Link } from '@/constants/link';
import { useDarkMode } from '@/hooks/context/darkMode';
import { useModal } from '@/hooks/context/modal';
import { faBell, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';


export const CheckingModalComponent = () => {

  const { closeModal } = useModal()
  const {darkMode} = useDarkMode()
  
  const handleConfirm = async () => {
      try {
        await axios.post(WITHDRAWAL , {}, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        })
        .then((response) => {
          if (response) {
            window.location.href = Home_Link;
            closeModal();
          }
        })
      } catch (error) {
      }
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'rgba(18, 18, 18, 0.8)',
      }}
    >
      <div
        className={`${darkMode ? 'bg-[#3A3A3A]' : 'bg-white'} mx-auto border-4 border-[#7732FF] rounded-md w-[500px] h-[200px] overflow-hidden flex flex-col justify-between`}
        style={{
          opacity: '1',
          zIndex: 210,
        }}
      >
        <div className='flex-1 flex items-center justify-center'>
          <span className='font-bold text-[20px]'><FontAwesomeIcon icon={faCircleExclamation} className='mr-[10px]'/>정말 회원 탈퇴 하시겠습니까!?</span>
        </div>
        <div className='w-[100%] h-[50px] overflow-hidden flex text-[15px]'>
          <button onClick={closeModal} className='w-[50%] h-[100%] bg-[#333333] font-bold text-white'>닫기</button>
          <button onClick={handleConfirm} className='flex-1 bg-[#111111] font-bold text-white'>탈퇴하기</button>
        </div>
      </div>
    </div>
  );
};

export const ChangeNameAlertComponent = () => {
  const { closeModal } = useModal();
  const { darkMode } = useDarkMode();
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const timeoutId = setTimeout(() => {
      closeModal();
      clearInterval(intervalId);
    }, 2000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [closeModal]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'rgba(18, 18, 18, 0.8)',
      }}
    >
      <div
        className={`${darkMode ? 'bg-[#3A3A3A]' : 'bg-white'} mx-auto border-4 border-[#7732FF] rounded-md w-[500px] h-[200px] overflow-hidden flex flex-col justify-between`}
        style={{
          opacity: '1',
          zIndex: 210,
        }}
      >
        <div className='flex-1 flex items-center justify-center'>
          <p className='font-bold text-[20px]'>
            <FontAwesomeIcon icon={faBell} className ='mr-[10px]'/>
            <span>
              이름이 성공적으로 변경되었습니다.
            </span>
          </p>
        </div>
        <div className='flex-1 flex items-center justify-start pl-[20px]'>
          <p className='font-bold text-[14px]'>
            *{countdown}초 후에 자동으로 닫힙니다.
          </p>
        </div>
        <div className='w-[100%] h-[50px] overflow-hidden flex text-[15px]'>
          <button onClick={closeModal} className='w-[100%] h-[100%] bg-[#333333] font-bold text-white'>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export const ChangePhotoAlertComponent = () => {
  const { closeModal } = useModal();
  const { darkMode } = useDarkMode();
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const timeoutId = setTimeout(() => {
      closeModal();
      clearInterval(intervalId);
    }, 2000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [closeModal]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'rgba(18, 18, 18, 0.8)',
      }}
    >
      <div
        className={`${darkMode ? 'bg-[#3A3A3A]' : 'bg-white'} mx-auto border-4 border-[#7732FF] rounded-md w-[500px] h-[200px] overflow-hidden flex flex-col justify-between`}
        style={{
          opacity: '1',
          zIndex: 210,
        }}
      >
        <div className='flex-1 flex items-center justify-center'>
          <p className='font-bold text-[20px]'>
            <FontAwesomeIcon icon={faBell} className ='mr-[10px]'/>
            <span>
              프로필 사진이 성공적으로 변경되었습니다.
            </span>
          </p>
        </div>
        <div className='flex-1 flex items-center justify-start pl-[20px]'>
          <p className='font-bold text-[14px]'>
            *{countdown}초 후에 자동으로 닫힙니다.
          </p>
        </div>
        <div className='w-[100%] h-[50px] overflow-hidden flex text-[15px]'>
          <button onClick={closeModal} className='w-[100%] h-[100%] bg-[#333333] font-bold text-white'>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};