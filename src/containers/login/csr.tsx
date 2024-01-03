// CSR (Client Side Rendering) Container
// 주재훈 작성.

'use client'

import { BuyerLoginComponent, SellerLoginComponent } from '@/components/login/loginComponents';
import { useState } from 'react';

function LoginContainer() {

  const [whichComponent, setWhichComponent] = useState('buyerLoginComponent')

  const clickBuyerBtn = () => {
    setWhichComponent('buyerLoginComponent')
  }

  const clickSellerBtn = () => {
    setWhichComponent('sellerLoginComponent')
  }

  return (
    <section className='w-[600px] h-[900px] flex flex-col'>
        <div className='ButtonDiv w-full flex items-center justify-between'>
        <button
          className={`w-[50%] h-[40px] shadow-sm ${(whichComponent === 'buyerLoginComponent') && 'bg-slate-200 text-black' }`}
          onClick={clickBuyerBtn}
          >구매자 로그인</button>
        <button
          className={`w-[50%] h-[40px] shadow-sm ${(whichComponent === 'sellerLoginComponent') && 'bg-slate-200 text-black' }`}
          onClick={clickSellerBtn}
        >판매자 로그인</button>
        </div>
      {
        (whichComponent === 'buyerLoginComponent') &&
          <BuyerLoginComponent/>
      }
      {
        (whichComponent === 'sellerLoginComponent') &&
        <SellerLoginComponent/>
      }
    </section>
  );
}

export default LoginContainer     

