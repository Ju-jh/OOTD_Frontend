// CSR (Client Side Rendering)
// 주재훈 작성.

'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faHeart, faMagnifyingGlass, faMoon, faSun, faUser } from '@fortawesome/free-solid-svg-icons'
import { MENUBOX_COLOR } from '@/constants/color'
import { useDarkMode } from '@/hooks/context/darkMode'
import { useAuth } from '@/hooks/context/isLogined'
import SearchModal from '@/components/searchmodal/modal'


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
        <Link href={'/'} style={{ width: '100px', height: '30px'}} className='flex items-center' >
          {
            darkMode ?
              <Image src={'/images/components/header/darkThemeLogo.png'} alt='darkLogoImage' width={100} height={30} style={{ objectFit: 'cover', width: '100%', height: '100%' }} priority/>
              :
              <Image src={'/images/components/header/lightThemeLogo.png'} alt='lightLogoImage' width={100} height={30} style={{ objectFit: 'cover', width: '100%', height: '100%' }} priority/>
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
      <div className='flex w-[200px] h-[100%]  items-center justify-between'>
        <button style={{ width: '21px', height: '21px'}}  onClick={showModal}>
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ width: '21px', height: '21px'}} className='hover:text-blue-500' />
        </button>
        {isModal && <SearchModal showModal={showModal} />}
        <Link href={'/likes'} style={{ width: '21px', height: '21px'}} ><FontAwesomeIcon icon={faHeart} style={{ width: '21px', height: '21px'}} className='hover:text-red-500' /></Link>
        <Link href={'/mycart'} style={{ width: '21px', height: '21px'}} ><FontAwesomeIcon icon={faCartShopping} style={{ width: '21px', height: '21px'}} className='hover:text-blue-500' /></Link>
        {isLogined ? (
          <Link href="/mypage" style={{ width: '23px', height: '23px'}}>
            <div style={{ width: '23px', height: '23px'}} className='rounded-full overflow-hidden bg-[#cfd5db]'>
              <Image src={photo} alt="profileImage" width={23} height={23} style={{ objectFit: 'cover', width: '100%', height: '100%' }}/>
            </div>
          </Link>
        ) : null}
        {
          !isLogined && <Link href={'/login'} style={{ width: '23px', height: '23px'}} ><FontAwesomeIcon icon={faUser} style={{ width: '21px', height: '21px'}} className='hover:text-blue-500' /></Link>
        }
      </div>
    </header>
  )
}