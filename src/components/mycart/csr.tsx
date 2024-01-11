'use client'

import { EVENT_COLOR } from '@/constants/color'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDarkMode } from '@/hooks/context/darkMode';
import axios from 'axios'


const MyCartComponent = () => {

  const testArray = [1, 2, 3, 4];
  const { darkMode } = useDarkMode();

  const [allChecked, setAllChecked] = useState(true);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    testArray.reduce((acc, _, index) => ({ ...acc, [index]: true }), {})
  );
  const checkedCount = Object.values(checkedItems).filter((value) => value).length;


  const handleCheckAllChange = () => {
    setAllChecked(!allChecked);
    setCheckedItems((prev) => Object.fromEntries(Object.keys(prev).map((key) => [key, !allChecked])));
  };

  const handleItemCheckChange = (index: number) => {
    setCheckedItems((prev) => {
      const updatedCheckedItems = { ...prev, [index]: !prev[index] };
      setAllChecked(Object.values(updatedCheckedItems).every((value) => value));
      return updatedCheckedItems;
    });
  };

  console.log(checkedCount)

  useEffect(() => {
    axios
      .get(`api/cart/view`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log("aaa",response.data);
      })
      .catch((error) => {
        console.error("API 호출 중 오류 발생:", error);
      });
  })


  return (
    <div className='flex-1 p-[50px]'>
      <section className='w-full h-full flex flex-col gap-[20px]  '>
        <h2 className='text-start text-[30px] font-bold'>장바구니</h2>
        <div className='flex-1 flex flex-col gap-[20px]'>
          <div className='flex items-center justify-between'>
            <div className='text-[20px] font-semibold'>
              <span className='mr-[4px]'>총</span>
              <span className='font-bold' style={{ color: EVENT_COLOR }}>{checkedCount}</span>
              <span className='font-bold' style={{ color: EVENT_COLOR }}>개 : </span>
              <span>668,330</span>
              <span>원</span>
            </div>
            <button className={`w-[110px] h-[50px] flex items-center border ${darkMode ? 'border-[#CFD5DB]' : 'border-[#CFD5DB]'} rounded-md justify-center text-[14px] font-semibold`}>
              <span>선택 삭제</span>
              <span className='ml-[3px]'>(</span>
              <span>{checkedCount}</span>
              <span className='mr-[3px]'>)</span>
            </button>
          </div>
          <ul className={`w-[100%]  border ${darkMode ? 'border-[#121212]' : 'border-[#dde0e3]'}`}>
            <li className={`flex w-[100%] h-[70px] ${darkMode ? 'bg-[#121212] border-[#121212]' : 'bg-[#F7F8F9] border-[#dde0e3]'} border-b`}>
              <div className='relative w-[5%] h-[100%] flex items-center justify-center text-[#aeb5bb]  '>
                <input type="checkbox" name="" id="CheckAllCartItem" checked={allChecked} onChange={handleCheckAllChange} className='relative hover:default:ring-2 border cursor-pointer border-[#aeb5bb] checked:border-none w-[25px] h-[25px] appearance-none rounded-sm checked:bg-[#7732FF]' />
                <label htmlFor="CheckAllCartItem" className="absolute cursor-pointer z-10  ">
                  <FontAwesomeIcon icon={faCheck} className='w-[15px] h-[15px] text-[15px] checked:text-white' />
                </label>
              </div>
              <div className={`w-[40%] h-[100%] flex items-center justify-center border-l ${darkMode ? 'border-l-[#3a3a3a]' : 'border-l-[#dde0e3]'} `}>
                <span className='font-bold text-[17px]'>상품정보</span>
              </div>
              <div className={`w-[10%] h-[100%] flex items-center justify-center border-l ${darkMode ? 'border-l-[#3a3a3a]' : 'border-l-[#dde0e3]'} `}>
                <span className='font-bold text-[17px]'>배송국가</span>
              </div>
              <div className={`w-[10%] h-[100%] flex items-center justify-center border-l ${darkMode ? 'border-l-[#3a3a3a]' : 'border-l-[#dde0e3]'} `}>
                <span className='font-bold text-[17px]'>적립금</span>
              </div>
              <div className={`w-[10%] h-[100%] flex items-center justify-center border-l ${darkMode ? 'border-l-[#3a3a3a]' : 'border-l-[#dde0e3]'} `}>
                <span className='font-bold text-[17px]'>판매가</span>
              </div>
              <div className={`w-[15%] h-[100%] flex items-center justify-center border-l ${darkMode ? 'border-l-[#3a3a3a]' : 'border-l-[#dde0e3]'} `}>
                <span className='font-bold text-[17px]'>최종 구매가</span>
              </div>
              <div className={`w-[10%] h-[100%] flex items-center justify-center border-l ${darkMode ? 'border-l-[#3a3a3a]' : 'border-l-[#dde0e3]'} `}>
                <span className='font-bold text-[17px]'>삭제</span>
              </div>
            </li>
            {testArray.map((item, index) => (
              <li key={index} className={`w-[100%] h-[150px] flex items-center border-b ${darkMode ? 'border-b-[#121212]' : 'border-b-[#dde0e3]'}`}>
                <div className='w-[5%] h-[100%] flex items-center justify-center text-[#aeb5bb]  '>
                  <input type="checkbox" name="" id={`item${index}`} checked={checkedItems[index]} onChange={() => handleItemCheckChange(index)} className='relative cursor-pointer hover:default:ring-2 border border-[#aeb5bb] checked:border-none w-[25px] h-[25px] appearance-none rounded-sm checked:bg-[#7732FF]' />
                  <label htmlFor={`item${index}`} className="absolute cursor-pointer z-10  ">
                    <FontAwesomeIcon icon={faCheck} className='w-[15px] h-[15px] text-[15px] checked:text-white' />
                  </label>
                </div>
                <div className={`w-[40%] h-[100%] flex items-center justify-between border-l ${darkMode ? 'border-l-[#121212]' : 'border-l-[#dde0e3]'}  p-[30px]`}>
                  <div className='w-[90px] h-[100%]'>
                    <Image src="/images/components/mycart/item1.png" alt="itemImage" width="90" height="90" />
                  </div>
                  <div className='w-[240px] h-[100%] flex flex-col items-start justify-center'>
                    <span className='font-bold'>Herno Laminar</span>
                    <span>클라우디아 여성 패딩 블랙{index}</span>
                  </div>
                  <div className='w-[260px] h-[100%] bg-red-500'>

                  </div>
                </div>
                <div className={`w-[10%] h-[40%] flex items-center justify-center border-l ${darkMode ? 'border-l-[#121212]' : 'border-l-[#dde0e3]'} text-[14px]`}>
                  <span className=''>한국</span>
                </div>
                <div className={`w-[10%] h-[40%] flex items-center justify-center border-l ${darkMode ? 'border-l-[#121212]' : 'border-l-[#dde0e3]'} text-[14px]`}>
                  <span className=''>최대</span>
                  <span style={{ color: EVENT_COLOR }}>
                    16,835<span>원</span>
                  </span>
                </div>
                <div className={`w-[10%] h-[80%] flex flex-col items-center justify-center border-l ${darkMode ? 'border-l-[#121212]' : 'border-l-[#dde0e3]'} text-[15px]`}>
                  <span className='line-through text-[#858788]'>
                    1,539,000<span>원</span>
                  </span>
                  <span className='text-[#858788]'>
                    689,000<span>원</span>
                  </span>
                  <span style={{ color: EVENT_COLOR }}>
                    -20,670<span>원</span>
                  </span>
                  <span style={{ color: EVENT_COLOR }}>
                    (쿠폰할인)
                  </span>
                </div>
                <div className={`w-[15%] h-[50%] flex items-center justify-center border-l ${darkMode ? 'border-l-[#121212]' : 'border-l-[#dde0e3]'}`}>
                  <span className='font-bold text-[17px]'>668,330<span>원</span></span>
                </div>
                <div className={`w-[10%] h-[50%] flex items-center justify-center border-l ${darkMode ? 'border-l-[#121212]' : 'border-l-[#dde0e3]'}`}>
                  <button className='w-[80px] h-[50px] flex items-center border border-[#CFD5DB] rounded-md justify-center text-[14px] font-semibold'>
                    <span>삭제</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className='w-[100%] h-[300px]  flex-col'>
            <div className='w-[100%] h-[3px] border-2 border-black'></div>
            <div className={`flex-1 border ${darkMode ? 'border-[#121212]' : 'border-[#dde0e3]'} flex`}>
              <div className={`w-[30%] h-[100%] flex flex-col  justify-center gap-[10px] ${darkMode ? 'bg-[#121212]' : 'bg-[#F7F8F9]'}  py-[20px] px-[40px]`}>
                <div className='flex items-center justify-between'>
                  <span>주문 상품 수</span>
                  <span>{checkedCount}
                    <span>개</span>
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span>총 상품 가격</span>
                  <span>1,539,000
                    <span>원</span>
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span>상품 할인</span>
                  <span>-850,000
                    <span>원</span>
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span>쿠폰할인 할인</span>
                  <span>-20,670
                    <span>원</span>
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span>관부가세</span>
                  <span>관부가세 없음</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span>배송비</span>
                  <div className='flex flex-col'>
                    <span className='text-end'>전상품 무료배송</span>
                    <span className='text-[14px] text-[#868E96]'>(대형가구와 같은 대형 상품 제외)</span>
                  </div>
                </div>

              </div>
              <div className='flex-1 flex flex-col items-end justify-center p-[20px]'>
                <div className='font-bold'>
                  <span className='mr-[10px] text-[19px]'>최종구매가</span>
                  <span className='text-[24px]'>668,300
                    <span>원</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button className='w-[320px] h-[55px] bg-[#111719] text-white font-bold mx-auto rounded-md'>구매하기</button>
        </div>
      </section>
    </div>
  )
}

export default MyCartComponent