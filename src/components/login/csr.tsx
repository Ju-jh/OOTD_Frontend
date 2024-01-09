'use client'

import { useState } from 'react'
import { KAKAO_COLOR } from '@/constants/color'
import { GOOGLE_LOGIN_LINK, KAKAO_LOGIN_LINK } from '@/constants/link'
import Link from 'next/link'

const LoginComponent = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isTyped, setIsTyped] = useState(false);

  const handleEmailChange = (e : any) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(newEmail));

    setIsTyped(true)
  };

  const handlePasswordChange = (e : any) => {
    const newPassword = e.target.value;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    setIsPasswordValid(passwordRegex.test(newPassword));

    setPassword(newPassword);

    setIsTyped(true)
  };

  const handleLoginClick = () => {
    if (isEmailValid) {
      console.log('로그인!');
    } else {
      console.log('유효한 이메일을 입력하세요.');
    }
  };

  return (
    <div className='flex-1 p-[50px]'>
      <section className='w-full flex flex-col itmes-center justify-center gap-[20px] py-[50px]'>
        <h2 className='text-center text-[22px] font-semibold'>이메일 로그인</h2>
        <div className='flex flex-col items-center'>
          <p className='w-[100%] text-start text-[13px] mb-[5px]'>이메일</p>
          <input
            type="email"
            className='w-[100%] h-[40px] text-black p-[10px] border focus:border-purple-400 outline-none'
            placeholder='example@ootd.com'
            value={email}
            onChange={handleEmailChange}
          />
          {!isEmailValid && <p className='text-red-500 w-[100%] text-start text-[13px] mt-[10px]'>이메일이 형식이 올바르지 않습니다.</p>}
        </div>
        <div className='flex flex-col items-center'>
          <p className='w-[100%] text-start text-[13px] mb-[5px]'>비밀번호</p>
          <input
            type="password"
            className='w-[100%] h-[40px] text-slate-500 p-[10px] border focus:border-purple-400 outline-none'
            placeholder='비밀번호 8자 이상'
            value={password}
            onChange={handlePasswordChange}
          />
          {!isPasswordValid && <p className='text-red-500 w-[100%] text-start text-[13px] mt-[10px]'>비밀번호 8자 이상, 대소문자, 숫자, 특수문자가 포함되어있지 않습니다.</p>}
        </div>
        <div className='flex items-center gap-[20px]'>
          <button
            className={`w-full h-[50px] flex items-center justify-center rounded-md bg-white shadow-sm ${(isEmailValid && isPasswordValid && isTyped) ? 'hover:bg-blue-100' : ''}`}
            onClick={handleLoginClick}
            disabled={(!isEmailValid || !isPasswordValid || !isTyped)}
          >
            <span className='font-semibold text-black'>로그인</span>
          </button>
          <Link href={'/signup'} className='w-full h-[50px] flex items-center justify-center rounded-md bg-white shadow-sm hover:bg-blue-100'>
            <span className='font-semibold text-black'>회원가입</span>
          </Link>
        </div>
        <div className='w-[100%] flex items-center justify-center mt-[20px]'>
          <Link href={'/find_account'} className='hover:underline'>
            <p>이메일로 비밀번호 찾기 / 변경 </p>
          </Link>
        </div>
      </section>
      <section className='flex flex-col gap-[20px] border-t-2 py-[50px]'>
          <Link href={GOOGLE_LOGIN_LINK}>
          <button className='w-full h-[60px] flex items-center justify-center rounded-md bg-white shadow-md hover:bg-blue-100'>
              <div className='inline-block mr-[10px]'>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48" >
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
              </div>
              <span className='font-semibold text-black'>Google로 계속하기</span>
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
              <span className='font-semibold text-black'>카카오로 계속하기</span>
            </button>
          </Link>
      </section>
    </div>
  )
}

export default LoginComponent