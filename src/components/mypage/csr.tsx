'use client'

import { useDarkMode } from '@/hooks/context/darkMode'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'


export const MyBasicInfoComponent = () => {

  const {darkMode} = useDarkMode()

  return(
    <div className='mx-auto w-[450px] min-h-[250px] mt-[100px] mb-[40px] px-[40px]'>
      <div className='flex items-center justify-between px-[20px] relative'>
        <button className=' rounded-full overflow-hidden bg-[#f3f6f6]'>
          <Image src='/images/components/mypage/testProfileImage.png' alt='myProfileImage' width={60} height={60} />
          <span className={`absolute ${darkMode ? 'text-white' : 'text-black'}  text-[12px] font-bold -translate-x-[19px]`}>사진변경</span>
        </button>
        <div className='text-[14px] translate-y-[5px]'>
          <p>안녕하세요, <span>사용자이름</span> 님.</p>
          <p>고객님과 OOTD는 <span className='font-bold'>반가운 사이</span>입니다.</p>
        </div>
      </div>
      <div className={`w-[100%] h-[100px] mt-[40px] ${darkMode ? 'bg-[#121212]' : 'bg-[#F7F8F9]'}  flex items-center justify-center gap-[50px] rounded-md`}>
        <button className=''>
          <p className='font-bold'>O money</p>
          <p className='text-[14px]'>4,011<span>원</span></p>
        </button>
        <button className=''>
          <p className='font-bold'>쿠폰</p>
          <p className='text-[14px]'>0<span>건</span></p>
        </button>
      </div>
    </div>
  )
}

export const MyPageInfoComponent = () => {

  const [whichComponent, setWhichComponent] = useState('order')

  const clickOrderBtn = () => {
    setWhichComponent('order')
  }
  const clickReviewBtn = () => {
    setWhichComponent('review')
  }
  const clickSellBtn = () => {
    setWhichComponent('sell')
  }
  const clickEditInfoBtn = () => {
    setWhichComponent('editinfo')
  }

  return (
    <div className='w-[100%] min-h-[50px] '>
      <div className='w-[100%] h-[50px] flex items-end justify-center text-[18px]'>
        <button onClick={clickOrderBtn} className={`w-[200px] h-[100%] border-b-2 font-bold ${whichComponent === 'order' ? ' border-black' : 'border-transparent text-[#ADB5BD]'}`}><span>주문</span></button>
        <button onClick={clickReviewBtn} className={`w-[200px] h-[100%] border-b-2 font-bold ${whichComponent === 'review' ? ' border-black' : 'border-transparent text-[#ADB5BD]'}`}><span>리뷰</span></button>
        <button onClick={clickSellBtn} className={`w-[200px] h-[100%] border-b-2 font-bold ${whichComponent === 'sell' ? ' border-black' : 'border-transparent text-[#ADB5BD]'}`}><span>판매</span></button>
        <button onClick={clickEditInfoBtn} className={`w-[200px] h-[100%] border-b-2 font-bold ${whichComponent === 'editinfo' ? ' border-black' : 'border-transparent text-[#ADB5BD]'}`}><span>정보수정</span></button>
      </div>
      { (whichComponent === 'order') && <MyPageOrderComponent />}
      { (whichComponent === 'review') && <MyPageReviewComponent />}
      { (whichComponent === 'sell') && <MyPageSellComponent />}
      { (whichComponent === 'editinfo') && <MyPageEditInfoComponent />}
    </div>
  )
}

export const MyPageOrderComponent = () => {

  const testArray = [1, 2, 3, 4];

  return (
    <div className='w-[100%] min-h-[200px] text-[14px]'>
      <span>최근 주문내역</span>
      <ul className='w-[100%] border-t border-b border-black'>
        <li className='w-[100%] h-[40px] flex items-center border-b border-black'>
          <div className='w-[20%] h-[100%] flex items-center justify-center'>
            <span>주문날짜</span>
          </div>
          <div className='w-[20%] h-[100%] flex items-center justify-center'>
            <span>주문번호</span>
          </div>
          <div className='w-[40%] h-[100%] flex items-center justify-center'>
            <span>주문상품</span>
          </div>
          <div className='w-[20%] h-[100%] flex items-center justify-center'>
            <span>진행상황</span>
          </div>
        </li>
        {
          testArray.map((item, index) => (
            <li key={index} className='w-[100%] h-[300px] flex flex-col items-start border-b border-[#ADB5BD]'>
              <div className='w-[100%] h-[100px] flex text-[13px]'>
                <div className='w-[20%] h-[100%] flex items-center justify-center'>
                  <span>2022.8.10</span>
                </div>
                <div className='w-[20%] h-[100%] flex items-center justify-center'>
                  <span>1660058408040</span>
                </div>
                <div className='w-[40%] h-[100%] flex items-center justify-start'>
                  <Link href='/해당 아이템 디테일 페이지'>
                    <Image src={'/images/components/mycart/item1.png'} alt='itemImage' width={50} height={50}></Image>
                  </Link>
                  <div className='text-[14px] ml-[10px]'>
                    <p>우먼즈 메달리스트 로우탑 가죽 여성 스니커즈 화이트</p>
                    <p className='text-[#ADB5BD]'>주문번호: <span>1660058408040002500</span></p>
                  </div>
                </div>
                <div className='w-[20%] h-[100%] flex flex-col items-center justify-center'>
                  <p className='text-red-500'>배송완료</p>
                </div>
              </div>
              <div className='w-[100%] h-[200px] bg-yellow-500 flex items-center'>
                <div>

                </div>
                <div>

                </div>
              </div>
            </li>
          ))
        }

      </ul>
    </div>
  )
}
export const MyPageReviewComponent = () => {
  return (
    <div className='w-[100%] min-h-[200px]'>
      리뷰 컴포넌트
    </div>
  )
}
export const MyPageSellComponent = () => {
  return (
    <div className='w-[100%] min-h-[200px]'>
      판매 컴포넌트
    </div>
  )
}
export const MyPageEditInfoComponent = () => {
  return (
    <div className='w-[100%] min-h-[200px]'>
      정보수정 컴포넌트
    </div>
  )
}