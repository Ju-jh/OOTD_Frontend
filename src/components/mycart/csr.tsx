'use client'

import { EVENT_COLOR } from '@/constants/color'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDarkMode } from '@/hooks/context/darkMode';
import axios from 'axios'
import Link from 'next/link'

interface Item {
  c_id: number;
  item: {
    i_id: number;
    photo: string;
    category: string;
    brand: string;
    title: string;
    discount: number;
    price: number;
  }
}

const MyCartComponent = () => {

  const { darkMode } = useDarkMode();

  const [state, setState] = useState(false)
  const [cartArray, setCartArray] = useState<Item[]>([])
  const [allChecked, setAllChecked] = useState(true);
  const initialCheckedItems: Record<number, boolean> = {};
  Object.keys(cartArray).forEach((index: any) => {
    initialCheckedItems[index] = true;
  });
  const [checkedItems, setCheckedItems] = useState(initialCheckedItems);
  const checkedCount = Object.values(checkedItems).filter((value) => value).length;
  const checkedCartItems = Object.keys(checkedItems)
    .filter(key => checkedItems[parseInt(key)])
    .map(key => cartArray[parseInt(key)]);

  // 기웅이가 추가한 코드 ()
  const [isCartId, setIsCartId] = useState<Number[]>([])

  const isAllchecked = () => {
    return Object.values(checkedItems).every((value) => value);
  };

  const handleCheckAllChange = () => {
    setAllChecked((prevAllChecked) => !prevAllChecked);
    setCheckedItems((prev) => {
      const newCheckedItems: Record<number, boolean> = {};
      for (let key in prev) {
        newCheckedItems[key] = !allChecked;
      }
      return newCheckedItems;
    });
  };

  const handleCheckboxChange = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getCartData = () => {
    axios
      .get(`api/cart/view`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setCartArray(response.data.data);

        // 기웅이가 추가한 코드 (c_id로만 이루어진 배열생성)
        const car = response.data.data.map((item: { c_id: any }) => [item.c_id]).flat();
        setIsCartId(car)

        const newInitialCheckedItems: Record<number, boolean> = {};
        response.data.data.forEach((_: any, index: number) => {
          newInitialCheckedItems[index] = true;

        });
        setCheckedItems(newInitialCheckedItems);
      })
      .catch((error) => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }
  
  const deleteOneCartButton = (cartId: number) => {
    axios
      .post(`api/cart/delete`, { cartId }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          setState(!state)
        }
      })
      .catch((error) => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }

  const deleteChosenCartButton = (checkedCartItems: object) => {
    axios
      .post(`api/cart/delete_chosen`, { checkedCartItems }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          setState(!state)
        }
      })
      .catch((error) => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      await getCartData();
      handleCheckAllChange();
    };

    fetchData();

    setAllChecked(isAllchecked());
  }, [state]);

  useEffect(() => {
    setAllChecked(isAllchecked());
  }, [checkedItems])


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
            <button
              className={`w-[110px] h-[50px] flex items-center border ${darkMode ? 'border-[#CFD5DB]' : 'border-[#CFD5DB]'} rounded-md justify-center text-[14px] font-semibold`}
              onClick={() => deleteChosenCartButton(checkedCartItems)}
            >
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
            {cartArray.map((item, index) => (
              <li key={index} className={`w-[100%] h-[150px] flex items-center border-b ${darkMode ? 'border-b-[#121212]' : 'border-b-[#dde0e3]'}`}>
                <div className='w-[5%] h-[100%] flex items-center justify-center text-[#aeb5bb]  '>
                  <input type="checkbox" name="" id={`item${index}`} checked={checkedItems[index] || false} onChange={() => handleCheckboxChange(index)} className='relative cursor-pointer hover:default:ring-2 border border-[#aeb5bb] checked:border-none w-[25px] h-[25px] appearance-none rounded-sm checked:bg-[#7732FF]' />
                  <label htmlFor={`item${index}`} className="absolute cursor-pointer z-10  ">
                    <FontAwesomeIcon icon={faCheck} className='w-[15px] h-[15px] text-[15px] checked:text-white' />
                  </label>
                </div>
                <div className={`w-[40%] h-[100%] flex items-center justify-between border-l ${darkMode ? 'border-l-[#121212]' : 'border-l-[#dde0e3]'}  p-[30px]`}>
                  <div className='w-[90px] h-[100%] mr-[20px]'>
                    <Link key={index} href={`category/${item.item.category}/item/${item.item.i_id}`}>
                      <Image src={item.item.photo} alt="itemImage" width="90" height="90" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                    </Link>
                  </div>
                  <div className='w-[240px] h-[100%] flex flex-col items-start justify-center'>
                    <span className='font-bold'>{item.item.title}</span>
                    <span>{item.item.brand}</span>
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
                    {(item.item.discount != 0) ? Math.floor(item.item.discount * 0.05).toLocaleString() : Math.floor(item.item.price * 0.05).toLocaleString()}<span>원</span>
                  </span>
                </div>
                <div className={`w-[10%] h-[80%] flex flex-col items-center justify-center border-l ${darkMode ? 'border-l-[#121212]' : 'border-l-[#dde0e3]'} text-[15px]`}>
                  <span className='line-through text-[#858788]'>
                    {item.item.discount != 0 && (
                      <span className='font-bold text-[17px]'>
                        {Math.floor(item.item.price).toLocaleString()}<span>원</span>
                      </span>
                    )}
                  </span>
                  <span className=''>
                    {(item.item.discount != 0) ? Math.floor(item.item.discount).toLocaleString() : Math.floor(item.item.price).toLocaleString()}<span>원</span>
                  </span>
                  <span style={{ color: EVENT_COLOR }}>
                    {item.item.discount != 0 && (
                      <span className=''>
                        -{(Math.floor(item.item.price) - Math.floor(item.item.discount)).toLocaleString()}<span>원</span>
                      </span>
                    )}
                  </span>
                </div>
                <div className={`w-[15%] h-[50%] flex items-center justify-center border-l ${darkMode ? 'border-l-[#121212]' : 'border-l-[#dde0e3]'}`}>
                  <span className='font-bold text-[17px]'>{(item.item.discount != 0) ? Math.floor(item.item.discount).toLocaleString() : Math.floor(item.item.price).toLocaleString()}<span>원</span></span>
                </div>
                <div className={`w-[10%] h-[50%] flex items-center justify-center border-l ${darkMode ? 'border-l-[#121212]' : 'border-l-[#dde0e3]'}`}>
                  <button
                    className='w-[80px] h-[50px] flex items-center border border-[#CFD5DB] rounded-md justify-center text-[14px] font-semibold'
                    onClick={() => deleteOneCartButton(item.c_id)}
                  >
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
          {/* 기웅이가 추가한 코드 (url를 이용한 전달이외에 방법을 찾지못해서 
            as를 추가해서 url를 /payment로 고정을 시도했지만 /payment 페이지에서 값을 가져오지못해 주석처리) */}
          <Link
            href={{
              pathname: '/payment',
              query: {
                carts: JSON.stringify(["cart",isCartId]),
              },
            }}
            className='text-center'
          >
            <button className='w-[320px] h-[55px] bg-[#111719] text-white font-bold mx-auto rounded-md'>구매하기</button>
          </Link>
        </div>
      </section >
    </div >
  )
}

export default MyCartComponent