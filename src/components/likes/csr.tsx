'use client'

import { EVENT_COLOR } from '@/constants/color'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'


const LikesComponent = () => {

  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  return (
    <div className='flex-1 p-[50px]'>
      <section className='w-full h-full flex flex-col gap-[20px]  '>
        <h2 style={{color:EVENT_COLOR}} className='text-start text-[30px] font-bold flex items-center'>찜한상품 <span className='text-[20px] ml-[10px]'>{testArray.length}</span></h2>

        <ul className='w-[100%] flex items-center flex-wrap gap-[30px] p-[30px]'>
          {testArray.map((item, index) => (
            <li key={index} className='relative w-[200px] h-[270px]'>
              <button className='absolute translate-x-[183px]'><FontAwesomeIcon icon={faX} className='text-[#969ca4]' /></button>
              <div className='w-[200px] h-[200px] bg-[#f6f7f8] rounded-md'>
                <Image src="/images/components/mycart/item1.png" alt="itemImage" width="200" height="200"/>
              </div>
              <p className='text-[14px] font-bold'>Herno Laminar</p>
              <p className='text-[13px] text-[#969ca4] truncate'>23FW 에르노 여성 클라우디아 벨티모르다리엔</p>
              <span style={{color:EVENT_COLOR}} className='font-bold mr-[5px]'>
                57
                <span>%</span>
              </span>
              <span className='font-bold'>
                668,330
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