'use client'

import { LOGOUT } from '@/constants/endpoint'
import { GOOGLE_LOGIN_LINK, Home_Link, KAKAO_LOGIN_LINK } from '@/constants/link'
import { useDarkMode } from '@/hooks/context/darkMode'
import { useAuth } from '@/hooks/context/isLogined'
import { useModal } from '@/hooks/context/modal'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'


export const MyBasicInfoComponent = () => {

  const { darkMode } = useDarkMode()
  const { photo, name, setIsLogined } = useAuth()
  const { openModal } = useModal()

  const clickLogoutBtn = () => {
      axios
      .get(LOGOUT , {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((response) => {
          if (response) {
            setIsLogined(false)
            window.location.href = Home_Link;
          }
      })
      .catch(() => {
      });
  }


  return (    
    <div className='mx-auto w-[450px] min-h-[250px] mt-[100px] mb-[40px] px-[40px]'>
      <div className='flex items-center justify-between px-[20px] relative'>
        <button 
          className='relative rounded-full overflow-hidden bg-[#f3f6f6]'
          onClick={()=>{openModal('photoChange')}}
        >
          <Image src={photo} alt='myProfileImage' width={60} height={60} />
        </button>
          <span
            style={{
              WebkitTextStroke: '0.1px white', 
              pointerEvents: 'none',
            }}
            className={`absolute text-black  text-[14px] font-bold  translate-x-[3px] translate-y-[1px]`}>
            사진변경
          </span>
        <div className='text-[14px] translate-y-[5px]'>
          <p>안녕하세요, <span>{name}</span> 님.</p>
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

      <button
        className={`w-[100%] h-[40px] rounded-md ${darkMode ? 'bg-[#121212] hover:bg-[#141414]' : 'bg-[#F7F8F9] hover:bg-[#F7F8F9]'} text-[14px] mt-[35px]`}
        onClick={clickLogoutBtn}
      >
        로그아웃
      </button>
    </div>)
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

  const { email, name } = useAuth()
  const { darkMode } = useDarkMode()
  const [ otherName, setOtherName ] = useState('')
  const [ isNameValid, setIsNameValid ] = useState(false);
  const [ isTyped, setIsTyped ] = useState(false);

  const handleNameChange = (e : any) => {
    const newName = e.target.value;
    setOtherName(newName);

    if (name != '') {
      setIsNameValid(true)
    } else {
      setIsNameValid(false)
    }

    setIsTyped(true)
  };

  return (
    <div className='w-[100%] h-[500px] flex my-[30px]'>
      <section className='w-[50%] h-[100%] p-[30px]'>
        <div className='flex flex-col gap-[30px]'>
          <span className='font-bold'>기본 정보</span>
          <div>
            <p className='w-[100%] text-start text-[13px] mb-[5px]'>이메일</p>
            <input
              type="email"
              className={`w-[80%] h-[40px] ${darkMode ? 'text-white' : 'text-black '} p-[10px] border focus:border-purple-400 outline-none`}
              placeholder={email}
              value={email}
              disabled={true}
            />
          </div>
          <div>
            <p className='w-[100%] text-start text-[13px] mb-[5px]'>이름</p>
            <input
              type="text"
              className={`w-[80%] h-[40px] text-black p-[10px] border focus:border-purple-400 outline-none placeholder:text-black`}
              placeholder={name}
              value={otherName}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <p className='w-[100%] text-start text-[13px] mb-[5px]'>전화번호</p>
            <input
              type="email"
              className={`w-[80%] h-[40px] ${darkMode ? 'text-white' : 'text-black '} p-[10px] border focus:border-purple-400 outline-none`}
              placeholder={email}
              value={email}
            />
          </div>
          <button 
              className='w-[80%] h-[40px] flex items-center justify-center  rounded-md shadow-md bg-white hover:bg-slate-200 mt-[20px]'
            >
              <div className='inline-block mr-[10px]'>
              </div>
              <span className='font-semibold text-black'>정보 수정하기</span>
          </button>
        </div>
      </section>
      <section className='w-[50%] h-[100%] p-[30px]'>
        <div className='flex flex-col gap-[60px]'>
          <span className='font-bold'>계정 관리</span>
          <Link href={GOOGLE_LOGIN_LINK}>
          <button className='w-full h-[60px] flex items-center justify-center rounded-md bg-white shadow-md hover:bg-blue-100'>
              <div className='inline-block mr-[10px]'>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48" >
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
              </div>
              <span className='font-semibold text-black'>Google계정 연동하기</span>
            </button>
          </Link>
          <Link href={KAKAO_LOGIN_LINK}>
            <button 
              className='w-full h-[60px] flex items-center justify-center  rounded-md shadow-md bg-[#fae302] hover:bg-[#ffed49]'
            >
              <div className='inline-block mr-[10px]'>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                  <path fill="#263238" d="M24,4C12.402,4,3,11.611,3,21c0,5.99,3.836,11.245,9.618,14.273l-2.219,7.397	c-0.135,0.449,0.366,0.82,0.756,0.56l8.422-5.615C21.004,37.863,22.482,38,24,38c11.598,0,21-7.611,21-17S35.598,4,24,4z"></path><path fill="#ffca28" d="M15,18H9c-0.552,0-1-0.448-1-1v0c0-0.552,0.448-1,1-1h6c0.552,0,1,0.448,1,1v0	C16,17.552,15.552,18,15,18z"></path><path fill="#ffca28" d="M25,26v-9c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1v9c0,0.552-0.448,1-1,1h0	C25.448,27,25,26.552,25,26z"></path><path fill="#ffca28" d="M32,26v-9c0-0.552,0.448-1,1-1l0,0c0.552,0,1,0.448,1,1v9c0,0.552-0.448,1-1,1l0,0	C32.448,27,32,26.552,32,26z"></path><path fill="#ffca28" d="M32.621,21.207l4.914-4.914c0.391-0.391,1.024-0.391,1.414,0v0c0.391,0.391,0.391,1.024,0,1.414	l-4.914,4.914c-0.391,0.391-1.024,0.391-1.414,0l0,0C32.231,22.231,32.231,21.598,32.621,21.207z"></path><path fill="#ffca28" d="M36.078,20.665l3.708,4.717c0.341,0.434,0.266,1.063-0.168,1.404l0,0	c-0.434,0.341-1.063,0.266-1.404-0.168l-3.708-4.717c-0.341-0.434-0.266-1.063,0.168-1.404v0	C35.108,20.156,35.737,20.231,36.078,20.665z"></path><path fill="#ffca28" d="M30,27h-4c-0.552,0-1-0.448-1-1v0c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1v0	C31,26.552,30.552,27,30,27z"></path><path fill="#ffca28" d="M23.933,25.642l-3.221-9c-0.145-0.379-0.497-0.611-0.878-0.629c-0.111-0.005-0.54-0.003-0.641-0.001	c-0.392,0.007-0.757,0.241-0.906,0.63l-3.221,9c-0.198,0.516,0.06,1.094,0.576,1.292s1.094-0.06,1.292-0.576L17.42,25h4.16	l0.486,1.358c0.198,0.516,0.776,0.773,1.292,0.576S24.131,26.157,23.933,25.642z M18.136,23l1.364-3.812L20.864,23H18.136z"></path><path fill="#ffca28" d="M13,18h-2v8c0,0.552,0.448,1,1,1h0c0.552,0,1-0.448,1-1V18z"></path>
                </svg>
              </div>
              <span className='font-semibold text-black'>카카오계정 연동하기</span>
            </button>
          </Link>
          <button 
              className='w-full h-[60px] flex items-center justify-center  rounded-md shadow-md bg-white hover:bg-slate-200'
            >
              <div className='inline-block mr-[10px]'>
              </div>
              <span className='font-semibold text-black'>회원 탈퇴하기</span>
          </button>
        </div>
      </section>
    </div>
  )
}