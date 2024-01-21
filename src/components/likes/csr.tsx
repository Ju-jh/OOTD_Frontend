'use client'

import { EVENT_COLOR } from '@/constants/color'
import { GET_LIKE_ITEMS, PRESS_UNLIKE_BUTTON } from '@/constants/endpoint'
import { useDarkMode } from '@/hooks/context/darkMode'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Item {
  i_id: number;
  photo: string;
  category: string;
  brand: string;
  title: string;
  discount: number;
  price: number;
}

const LikesComponent = () => {
  
  const {darkMode} = useDarkMode()
  const [items, setItems] = useState<Item[]>([]);
  
  const showLikeItmes = () => {
    axios
    .get(GET_LIKE_ITEMS, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data)
      setItems(response.data)
    })
  }

  const clickUnLikeButton = (itemId: number) => {
    console.log(itemId)
    axios
    .post(PRESS_UNLIKE_BUTTON, {itemId}, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      showLikeItmes()
    })
  }

  useEffect(() => {
    showLikeItmes()
  },[])

  return (
    <div className='flex-1 p-[50px]'>
      <section className='w-full h-full flex flex-col gap-[20px]  '>
        <h2 style={{color:EVENT_COLOR}} className='text-start text-[30px] font-bold flex items-center'>찜한상품 <span className='text-[20px] ml-[10px]'>{items.length}</span></h2>
        <ul className='w-[100%] flex items-center flex-wrap gap-[30px] p-[30px]'>
          {items.map((item, index) => (
            <li key={index} className='relative w-[200px] h-[270px]'>
              <button 
                className='absolute translate-x-[177px] translate-y-[10px] w-[20px] h-[20px] flex items-center justify-center'
                onClick={()=>clickUnLikeButton(item.i_id)}
              >
                <FontAwesomeIcon icon={faX} className='text-[#969ca4] hover:text-[#7732FF]' />
              </button>
              <div className='w-[200px] h-[200px] mb-[10px] hover:rounded-2xl transition-all overflow-hidden border shadow-sm' style={{ borderColor: darkMode ? 'transparent' : '' }}>
                <Link key={index} href={`category/${item.category}/item/${item.i_id}` }>
                  <Image 
                    src={item.photo} 
                    alt="itemImage" 
                    width="200" height="200" 
                    style={{ objectFit: 'cover', width: '100%', height: '100%'}}/>
                </Link>
              </div>
              <p className='text-[14px] font-bold'>{item.brand}</p>
              <p className='text-[13px] text-[#969ca4] truncate'>{item.title}</p>
              <span style={{color:EVENT_COLOR}} className='font-bold mr-[5px]'>
                {Math.floor((item.discount / item.price) * 100)}
                <span>%</span>
              </span>
              <span className='font-bold'>
                {
                  item.discount != 0 ? Math.floor(item.discount).toLocaleString()  : Math.floor(item.price).toLocaleString()
                }
                
                <span>원</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default LikesComponent