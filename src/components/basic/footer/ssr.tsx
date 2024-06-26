// CSR (Client Side Rendering)
// 주재훈 작성.
'use client'

import { useDarkMode } from '@/hooks/context/darkMode'

export default function Footer() {
  const {darkMode} = useDarkMode()
  return (
    <footer 
      className={`w-full h-[200px] text-[12px] flex flex-col items-start justify-center p-[30px] ${darkMode ? 'bg-[#121212]' : 'bg-[#F7F8F9]'}`}
    >
      <div className='w-[70%] mx-auto'>
        <p className='mb-[10px]'>상호명 : 오오티디코리아 | 오오티디메일 : cs@ootd.com | 전화번호 : 1522-1234 | 주소 : 06610 서울특별시 서초구 서청대로77길 42, 10층 (서청동)</p>
        <p>
          사이버몰 내 판매되는 상품 중에는 개별 판매자가 판매하는 마켓플레이스 상품이 포함되어 있습니다.
        </p>
        <p  className='mb-[10px]'>
          (주) 오오티디코리아는 통신판매 중개자로서 통신판매의 당사자가 아니므로 개별 판매자가 등록한 상품정보에 대해서 책임을 지지 않습니다.
        </p>
        <p>
          단, 거래 과정에서 검수하고 보증하는 내용에 대한 책임은 당사에 있습니다.고객님 안전거래를 위해 결제 시 저희 사이트에서 가입한 구매안전 서비스를 이용하실 수 있습니다.
        </p>
        <p className='mb-[10px]'>
          토스페이먼츠 가입확인
        </p>
        <p>
          copyright(c) www.ootd.com all right reserved
        </p>
      </div>
    </footer>
  )
}