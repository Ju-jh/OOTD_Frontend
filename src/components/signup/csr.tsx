'use client'

import { useState } from 'react'

const SignUpComponent = () => {

  const [email, setEmail] = useState('');
  const [emailVerfiyNumber, setEmailVerifyNumber] = useState('');
  const [name, setname] = useState('');
  const [password, setPassword] = useState('');
  const [passwords, setPasswords] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailVerifyNumberValid, setIsEmailVerifyNumberValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordsValid, setIsPasswordsValid] = useState(true);
  const [isTyped, setIsTyped] = useState(false);

  const handleEmailChange = (e : any) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(newEmail));

    setIsTyped(true)
  };
  
  const handleEmailVerfiyNumberChange = (e : any) => {
    const newEmailVerifyNumber = e.target.value;
    setEmailVerifyNumber(newEmailVerifyNumber);

    const emailVerifyRegex = /^\d{6}$/;
    setIsEmailVerifyNumberValid(emailVerifyRegex.test(newEmailVerifyNumber));

    setIsTyped(true)
  };

  const handleNameChange = (e : any) => {
    const newName = e.target.value;
    setname(newName);

    if (name != '') {
      setIsNameValid(true)
    } else {
      setIsNameValid(false)
    }

    setIsTyped(true)
  };

  const handlePasswordChange = (e : any) => {
    const newPassword = e.target.value;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    setIsPasswordValid(passwordRegex.test(newPassword));

    setPassword(newPassword);

    setIsTyped(true)
  };

  const handlePasswordsChange = (e : any) => {
    const newPassword = e.target.value;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    setIsPasswordsValid(passwordRegex.test(newPassword));

    setPasswords(newPassword);

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
        <h2 className='text-center text-[22px] font-semibold'>이메일 회원가입</h2>
        <div className='flex flex-col items-center'>
          <p className='w-[100%] text-start text-[13px] mb-[5px]'>이메일</p>
          <div className='w-[100%] flex items-center jusfity-center'>
            <input
              type="email"
              className='w-[100%] h-[40px] text-black p-[10px] border focus:border-purple-400 outline-none'
              placeholder='example@weavers.com'
              value={email}
              onChange={handleEmailChange}
            />
            <button className='w-[30%] h-[40px] bg-blue-200 hover:bg-blue-300'>
              <span className='text-[14px] font-semibold text-black'>인증번호 발송</span> 
            </button>
          </div>
          {!isEmailValid && <p className='text-red-500 w-[100%] text-start text-[13px] mt-[10px]'>이메일이 형식이 올바르지 않습니다.</p>}
        </div>
        <div className='flex flex-col items-center'>
          <p className='w-[100%] text-start text-[13px] mb-[5px]'>이메일 인증 확인코드</p>
          <div className='w-[100%] flex items-center justify-center'>
            <input
              type="number"
              className='w-[100%] h-[40px] text-black p-[10px] border focus:border-purple-400 outline-none'
              placeholder='XXXXXX'
              value={emailVerfiyNumber}
              onChange={handleEmailVerfiyNumberChange}
            />
            <button className='w-[30%] h-[40px] bg-blue-200 hover:bg-blue-300'>
              <span className='text-[14px] font-semibold text-black'>인증번호 인증</span> 
            </button>
          </div>
          {!isEmailVerifyNumberValid && <p className='text-red-500 w-[100%] text-start text-[13px] mt-[10px]'>인증코드는 6자리 숫자입니다.</p>}
        </div>
        <div className='flex flex-col items-center'>
          <p className='w-[100%] text-start text-[13px] mb-[5px]'>이름</p>
          <input
            type="text"
            className='w-[100%] h-[40px] text-black p-[10px] border focus:border-purple-400 outline-none'
            placeholder='이름을 입력하세요.'
            value={name}
            onChange={handleNameChange}
          />
          {!isNameValid && <p className='text-red-500 w-[100%] text-start text-[13px] mt-[10px]'>이름을 입력해 주세요.</p>}
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
        <div className='flex flex-col items-center'>
          <p className='w-[100%] text-start text-[13px] mb-[5px]'>비밀번호 확인</p>
          <input
            type="password"
            className='w-[100%] h-[40px] text-slate-500 p-[10px] border focus:border-purple-400 outline-none'
            placeholder='비밀번호 8자 이상'
            value={passwords}
            onChange={handlePasswordsChange}
          />
          {!isPasswordsValid && <p className='text-red-500 w-[100%] text-start text-[13px] mt-[10px]'>비밀번호 8자 이상, 대소문자, 숫자, 특수문자가 포함되어있지 않습니다.</p>}
          { isPasswordValid && isPasswordsValid && (password === passwords) && password != '' && <p className='text-blue-500 w-[100%] text-start text-[13px] mt-[10px]'>비밀번호가 일치합니다.</p>}
        </div>
        <div className='flex items-center gap-[20px]'>
          <button
            className={`w-full h-[50px] flex items-center justify-center rounded-md bg-white shadow-sm ${(isEmailValid && isEmailVerifyNumberValid && isNameValid && isPasswordValid && isPasswordsValid && isTyped) ? 'hover:bg-blue-100' : ''}`}
            onClick={handleLoginClick}
            disabled={(!isEmailValid || !isEmailVerifyNumberValid || !isNameValid || !isPasswordValid || !isPasswordsValid || !isTyped)}
          >
            <span className='font-semibold text-black'>회원가입</span>
          </button>
        </div>
      </section>

    </div>
  )
}

export default SignUpComponent