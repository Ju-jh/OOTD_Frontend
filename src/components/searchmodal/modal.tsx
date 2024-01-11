// use client 쓰지 마세요.
// 이기웅 작성.

'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCaretDown, faCaretUp, faCartShopping, faHeart, faMagnifyingGlass, faMinus, faMoon, faSun, faUser, faX, faXmark } from '@fortawesome/free-solid-svg-icons'
import { MENUBOX_COLOR } from '@/constants/color'
import { useDarkMode } from '@/hooks/context/darkMode'
import { json } from 'stream/consumers'


export default function SearchModal(props: { showModal: any }) {

  const { showModal } = props

  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isRank, setIsRank] = useState("1")
  const [isSearch, isSetSearch] = useState("")
  const [isSearchList, setIsSearchList] = useState<string[]>([])

  const searchListTest = ["2024신년세일", "2", "2024신년세일", "2", "2024신년세일", "2", "2024신년세일", "2", "2024신년세일", "2"]

  const searchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isSetSearch(e.target.value);
    console.log(isSearch);
  };

  const searchList1 = (searchName: string) => {
    const searchList = localStorage.getItem('search')
    // setIsSearchList(searchList)
    // searchList.push(searchName)
    // localStorage.setItem('search', JSON.stringify(searchList))
  }


  useEffect(() => {
    const searchList = localStorage.getItem('search')
    if (!searchList) {
      localStorage.setItem('search', JSON.stringify([]))
    }
    searchList1("우왕")
  }, [])

  return (
    <div className='absolute w-full top-0 left-0 bg-white'>
      <div
        className={`fixed flex items-center justify-between w-full h-[80px] px-[15%] shadow-md ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}
        style={{ zIndex: 105 }}
      >
        <div className='h-full flex items-center'>
          <Link href={'/'}>
            {
              darkMode ?
                <Image src={'/images/components/header/darkThemeLogo.png'} alt='logoImage' width={50} height={50} style={{ width: 'auto', height: 'auto' }} />
                :
                <Image src={'/images/components/header/lightThemeLogo.png'} alt='logoImage' width={50} height={50} style={{ width: 'auto', height: 'auto' }} />
            }
          </Link>
        </div>
        <div className='border h-[50px] leading-[50px] px-[15px] text-[24px]'>
          <FontAwesomeIcon className='h-[24px] w-[24px] mr-[5px]' icon={faMagnifyingGlass} />
          <input className='outline-none w-[350px] h-[24px]' onChange={e => searchInputChange(e)} type="text" name="" id="" value={isSearch} />
        </div>
        <div onClick={showModal} className='flex h-full items-center justify-between cursor-pointer'>
          <FontAwesomeIcon className='h-[28px] w-[28px] text-[28px]' icon={faXmark} />
        </div>
      </div>
      <div className='h-[100vh] mt-[80px] mx-[30%]'>
        <div>
          <div className='flex justify-between pt-[16px] mb-[16px]'>
            <p className='text-[18px] font-bold'>최근 검색어</p>
            <button className='text-[12px] text-gray-300 mr-[5px]'>모두 삭제</button>
          </div>
          <div className='flex flex-wrap'>
            {isSearchList.map((value, index) => {
              return (
                <div key={index} className='flex bg-gray-300 h-[30px] leading-[30px] ml-[8px] mb-[8px] px-[10px] rounded-full'>
                  <span className='text-[14px]'>{value}</span>
                  <button className='ml-[2px]'>
                    <FontAwesomeIcon className='w-[14px] h-[14px] text-[14px]' icon={faX} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
        <div className='w-[100%] h-[1px] border-b border-gray-300 my-[24px]'></div>
        <div>
          <p className='text-[18px] font-bold my-[16px]'>추천 검색어</p>
          <div className='flex flex-wrap'>
            {searchListTest.map((value, index) => {
              return (
                <p key={index} className='text-[14px] bg-gray-300 ml-[8px] mb-[8px] px-[15px] py-[5px] rounded-full'>{value}</p>
              )
            })}
          </div>
        </div>
        <div className='w-[100%] h-[1px] border-b border-gray-300 my-[24px]'></div>
        <div className='overflow-y-auto'>
          <div className='flex justify-between my-[16px]'>
            <p className='text-[18px] font-bold'>인기 검색어</p>
            <button className='text-[12px] text-gray-300 mr-[5px]'>날짜 시간 기준</button>
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col w-[48%]'>
              {searchListTest.map((value, index) => {
                return (
                  <div key={index} className='flex justify-between text-[14px] mb-[20px]'>
                    <p className='w-[20px] text-center font-bold mr-[10px]'>{index + 1}</p>
                    <p className='flex-1 text-left'>{value}</p>
                    <div>
                      {isRank == "1" ? <FontAwesomeIcon icon={faCaretUp} />
                        : isRank == "2" ? <FontAwesomeIcon icon={faCaretDown} />
                          : <FontAwesomeIcon icon={faMinus} />}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className='flex flex-col w-[48%] mr-[5px]'>
              {searchListTest.map((value, index) => {
                return (
                  <div key={index} className='flex justify-between text-[14px] mb-[20px]'>
                    <p className='w-[20px] text-center font-bold mr-[10px]'>{index + 11}</p>
                    <p className='flex-1 text-left'>{value}</p>
                    <div>
                      {isRank == "1" ? <FontAwesomeIcon icon={faCaretUp} />
                        : isRank == "2" ? <FontAwesomeIcon icon={faCaretDown} />
                          : <FontAwesomeIcon icon={faMinus} />}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}