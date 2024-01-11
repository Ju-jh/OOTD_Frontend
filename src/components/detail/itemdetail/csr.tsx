// CSR (Client Side Rendering) Component
// 이기웅 작성.

'use client'

import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function ItemDetailComponent(itemList: any) {

    const item = itemList.itemList

    const [isDetail, setIsDetail] = useState(false)

    const detailItem = () => {
        setIsDetail(!isDetail)
    }

    return (
        <>
            <div className="w-full h-[10px] bg-gray-200 my-[64px]"></div>
            <div className={`relative overflow-hidden ${isDetail ? "" : "max-h-[800px]"} mx-[200px] pt-[10px] mb-[40px]`}>
                <div className="py-[32px] px-[20px]">
                    <p className="text-[20px] font-bold mb-[20px]">상품 정보</p>
                    <div className="flex text-[14px] mb-[12px]">
                        <p className="w-[80px]">상품코드</p>
                        <span>1</span>
                    </div>
                    <div className="flex text-[14px] mb-[12px]">
                        <p className="w-[80px]">상품명</p>
                        <span>23FW 톰브라운 클래식 사선완장 4Bar 맨투맨 스웨트 셔츠 FJT002A</span>
                    </div>
                    <div className="flex text-[14px] mb-[12px]">
                        <p className="w-[80px]">상세정보</p>
                        <span>상품고시정보</span>
                    </div>
                </div>
                <div className="w-full h-[80px] bg-yellow-300 mt-[20px] mb-[30px]">
                    광고1
                </div>
                <div className="w-full h-[80px] bg-yellow-300 mb-[30px]">
                    광고2
                </div>
                <div className="w-full h-[80px] bg-yellow-300 mb-[30px]">
                    광고3
                </div>

                <div className="bg-blue-300 h-[700px] mb-[44px]">

                </div>
                <button onClick={detailItem} className="absolute w-full h-[44px] inset-x-0 bottom-0 text-[14px] border boder-1 boder-gray-300">
                    <span className="text-gray-500 pr-[3px]">{isDetail ? "닫기" : "상품 설명 자세히 보기"}</span>
                    {isDetail ? <FontAwesomeIcon className="text-gray-500" icon={faChevronUp} /> : <FontAwesomeIcon className="text-gray-500" icon={faChevronDown} />}
                </button>
            </div>
            <div className="w-full h-[10px] bg-gray-200 my-[64px]"></div>
        </>
    );
}