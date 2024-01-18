'use client'

import { EVENT_COLOR } from '@/constants/color'
import { GET_LIKE_ITEMS, PRESS_LIKE_BUTTON, PRESS_UNLIKE_BUTTON } from '@/constants/endpoint'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Item {
  i_id: number;
  photo: string;
  brand: string;
  title: string;
  discount: number;
  price: number;
}

const LikesComponent = () => {
  
const [items, setItems] = useState<Item[]>([]);

  const clickLikeButton = () => {
    axios
    .post(PRESS_LIKE_BUTTON, {}, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then(() => {
      showLikeItmes()  
    })
  }

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
      console.log(response.data)
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
        <button
          onClick={clickLikeButton}
        >
          찜
        </button>
        <ul className='w-[100%] flex items-center flex-wrap gap-[30px] p-[30px]'>
          {items.map((item, index) => (
            <li key={index} className='relative w-[200px] h-[270px]'>
              <button 
                className='absolute translate-x-[183px]'><FontAwesomeIcon icon={faX} className='text-[#969ca4]' 
                onClick={()=>clickUnLikeButton(item.i_id)}
                />
              </button>
              <div className='w-[200px] h-[200px] bg-[#f6f7f8] rounded-md'>
                <Image src={item.photo} alt="itemImage" width="200" height="200"/>
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