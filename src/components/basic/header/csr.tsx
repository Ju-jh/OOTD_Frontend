// CSR (Client Side Rendering)
// 주재훈 작성.

'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCartShopping, faHeart, faMagnifyingGlass, faMoon, faSun, faUser } from '@fortawesome/free-solid-svg-icons'
import { MENUBOX_COLOR } from '@/constants/color'
import { useDarkMode } from '@/hooks/context/darkMode'
import { useAuth } from '@/hooks/context/isLogined'
import SearchModal from '@/components/searchmodal/modal'
import axios from 'axios'


export default function Header() {

  const { darkMode, toggleDarkMode } = useDarkMode();
  const { isLogined, photo } = useAuth()
  const [isModal, setIsModal] = useState(false);

  const showModal = () => {
    setIsModal(!isModal)
  }
  
  return (
    <header
      className={`fixed flex items-center justify-between w-full h-[80px] px-[15%] shadow-md ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}
      style={{ zIndex: 100 }}
    >
      <div className='h-full flex items-center'>
        <Link href={'/'}>
          {
            darkMode ?
              <Image src={'/images/components/header/darkThemeLogo.png'} alt='logoImage' width={90} height={60} />
              :
              <Image src={'/images/components/header/lightThemeLogo.png'} alt='logoImage' width={90} height={60} />
          }
        </Link>
        <div
          className='relative w-[100px] h-[30px] ml-[30px] flex items-center justify-between rounded-xl overflow-hidden'
          style={{ backgroundColor: MENUBOX_COLOR }}
        >
          <div
            className={`absolute w-[50px] h-[30px] rounded-xl transition-all bg-slate-300 ${darkMode ? 'translate-x-[50px] bg-blue-500' : ''}`}
            style={{ zIndex: 1 }}
          >
          </div>
          <button
            className={`w-[50px] h-[30px] flex items-center justify-center transition-all rounded-xl `}
            onClick={toggleDarkMode}
            style={{ zIndex: 5 }}
          >
            <FontAwesomeIcon icon={faSun} className='w-[17px] h-[17px] text-[17px] text-black' />
          </button>
          <button
            className={`w-[50px] h-[30px] flex items-center justify-center transition-all rounded-xl  `}
            onClick={toggleDarkMode}
            style={{ zIndex: 5 }}
          >
            <FontAwesomeIcon icon={faMoon} className='w-[17px] h-[17px] text-[17px] text-black' />
          </button>
        </div>
      </div>
      <div className='flex w-[200px] h-full items-center justify-between'>
        <button onClick={showModal}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='w-[21px] h-[21px] text-[21px] hover:text-blue-500' />
        </button>
        {isModal && <SearchModal showModal={showModal} />}
        <Link href={'/likes'}><FontAwesomeIcon icon={faHeart} className='w-[21px] h-[21px] text-[21px] hover:text-red-500' /></Link>
        <Link href={'/mycart'}><FontAwesomeIcon icon={faCartShopping} className='w-[21px] h-[21px] text-[21px] hover:text-blue-500' /></Link>
        {isLogined ? (
          <Link href="/mypage">
            <div className='w-[25px] h-[25px] rounded-full overflow-hidden bg-[#cfd5db] -translate-y-[2px]'>
              <Image src={photo} alt="profileImage" width={25} height={25} />
            </div>
          </Link>
        ) : null}
        {
          !isLogined && <Link href={'/login'}><FontAwesomeIcon icon={faUser} className='w-[21px] h-[21px] text-[21px] hover:text-blue-500' /></Link>
        }
      </div>
    </header>
  )
}