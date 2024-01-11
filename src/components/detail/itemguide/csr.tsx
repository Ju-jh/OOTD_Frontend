// CSR (Client Side Rendering) Component
// 이기웅 작성.

'use client'

import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function ItemGuideComponent(itemList: any) {

     const item = itemList.itemList
     
     const [isGuide1, setIsGuide1] = useState(false)
     const [isGuide2, setIsGuide2] = useState(false)
     const [isGuide3, setIsGuide3] = useState(false)
     const [isGuide4, setIsGuide4] = useState(false)

     return (
          <div className="text-[16px] my-[32px] mx-[200px] pt-[10px] mb-[40px]">
               <div className="flex justify-between items-center h-[55px] px-[5px] font-bold border-b border-black">
                    <span>상품 고시 정보</span>
                    {isGuide1 ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
               </div>
               <div className="flex justify-between items-center h-[55px] px-[5px] font-bold  border-b border-black">
                    <span>배송 안내</span>
                    {isGuide2 ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
               </div>
               <div className="flex justify-between items-center h-[55px] px-[5px] font-bold  border-b border-black">
                    <span>교환 / 환불 안내</span>
                    {isGuide3 ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
               </div>
               <div className="flex justify-between items-center h-[55px] px-[5px] font-bold  border-b border-black">
                    <span>1월 무이자 카드 할부 안내</span>
                    {isGuide4 ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
               </div>
          </div>
     );
}