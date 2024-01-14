// CSR (Client Side Rendering) Component
// 이기웅 작성.

'use client'

import { EVENT_COLOR, STAR_COLOR } from "@/constants/color";
import { useModal } from "@/hooks/context/modal";
import { faChevronDown, faChevronRight, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function ItemReviewComponent(itemList: any) {

    const item = itemList.itemList
    const [isReview, setIsReview] = useState<{ star: number, comment: string }[]>([{ star: 0, comment: "" }]);
    const [isDetail, setIsDetail] = useState(false)
    const { openModal } = useModal()

    const review = [{ star: 4, comment: "1" }, { star: 4, comment: "2" }, { star: 4, comment: "3" }, { star: 4, comment: "4" }]

    const detailItem = () => {
        setIsDetail(!isDetail)
    }

    return (
        <div>
            <div className="w-full h-[10px] bg-gray-200 my-[64px]"></div>
            <div className={`relative overflow-hidden ${isDetail ? "" : "max-h-[800px]"} mx-[200px] pt-[10px] mb-[40px]`}>
                <div className="py-[32px] px-[20px]">
                    <p className="text-[20px] font-bold mb-[20px]">상품 정보</p>
                    <div className="flex text-[14px] mb-[12px]">
                        <p className="w-[80px]">상품코드</p>
                        <span>{item.i_id}</span>
                    </div>
                    <div className="flex text-[14px] mb-[12px]">
                        <p className="w-[80px]">상품명</p>
                        <span>{item.title}</span>
                    </div>
                    <div className="flex text-[14px] mb-[12px]">
                        <p className="w-[80px]">상세정보</p>
                        <span>{item.description}</span>
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
            <div className="text-[16px] my-[32px] mx-[200px] pt-[10px]">
                <h2 className="text-[20px] mb-[20px] font-bold">상품 리뷰</h2>
                <div>
                    <div className="flex flex-col mb-[20px] border-b-2 border-gray-500">
                        <div className="flex mb-[20px]">
                            <div className="relative h-[20px] w-[85px] leading-[20px]">
                                <div className={`absolute text-gray-300 h-[20px] text-[20px]`}>★★★★★</div>
                                <div style={{ color: STAR_COLOR }} className="absolute h-[20px] text-[20px] w-[30%] overflow-hidden">★★★★★</div>
                            </div>
                            <span className="h-[20px] leading-[20px] text-[16px] px-[5px]">{review.length}개 평균</span>
                            <p className="h-[20px] leading-[20px] text-[16px] font-bold"> 1.5점</p>
                        </div>
                        <div className="flex text-[14px] mb-[12px]">
                            <p className="w-[80px]">색상</p>
                            <p className="w-[80px]">화면과 같아요</p>
                            <div className="relative h-[20px] w-[150px] mx-[10px] leading-[20px]">
                                <div className={`absolute w-full bg-gray-300 h-[6px] my-[7px] text-[20px]`}></div>
                                <div style={{ backgroundColor: EVENT_COLOR }} className="absolute h-[6px] my-[7px] text-[20px] w-[30%] overflow-hidden"></div>
                            </div>
                            <p style={{ color: EVENT_COLOR }} className="font-bold">20%</p>
                        </div>
                        <div className="flex text-[14px] mb-[12px]">
                            <p className="w-[80px]">사이즈</p>
                            <p className="w-[80px]">잘 맞아요</p>
                            <div className="relative h-[20px] w-[150px] mx-[10px] leading-[20px]">
                                <div className={`absolute w-full bg-gray-300 h-[6px] my-[7px] text-[20px]`}></div>
                                <div style={{ backgroundColor: EVENT_COLOR }} className="absolute h-[6px] my-[7px] text-[20px] w-[30%] overflow-hidden"></div>
                            </div>
                            <p style={{ color: EVENT_COLOR }} className="font-bold">20%</p>
                        </div>
                        <div className="flex text-[14px] mb-[12px]">
                            <p className="w-[80px]">두께감</p>
                            <p className="w-[80px]">적당해요</p>
                            <div className="relative h-[20px] w-[150px] mx-[10px] leading-[20px]">
                                <div className={`absolute w-full bg-gray-300 h-[6px] my-[7px] text-[20px]`}></div>
                                <div style={{ backgroundColor: EVENT_COLOR }} className="absolute h-[6px] my-[7px] text-[20px] w-[30%] overflow-hidden"></div>
                            </div>
                            <p style={{ color: EVENT_COLOR }} className="font-bold">20%</p>
                        </div>
                    </div>
                    <ul>
                        {review.map((value, index) => {

                            return (
                                <li key={index} className="w-[100%] border-b-2 border-gray-500">
                                    <div className="flex">
                                        <span className="font-bold mr-[5px]">{value.star}점</span>
                                        <div className="relative h-[20px] w-[85px] leading-[20px]">
                                            <div className={`absolute text-gray-300 h-[20px] text-[20px]`}>★★★★★</div>
                                            <div style={{ color: STAR_COLOR }} className={`absolute h-[20px] text-[20px] w-[${value.star * 20}%] overflow-hidden`}>★★★★★</div>
                                        </div>
                                    </div>
                                    <div className="py-[10px]">
                                        <div className="flex text-[14px] mb-[12px]">
                                            <p className="w-[80px]">색상</p>
                                            <p className="w-[80px]">{"화면과 같아요"}</p>
                                        </div>
                                        <div className="flex text-[14px] mb-[12px]">
                                            <p className="w-[80px]">사이즈</p>
                                            <p className="w-[80px]">{"잘 맞아요"}</p>
                                        </div>
                                        <div className="flex text-[14px] mb-[12px]">
                                            <p className="w-[80px]">두께감</p>
                                            <p className="w-[80px]">{"적당해요"}</p>
                                        </div>
                                    </div>
                                    <div className="flex mb-[10px] text-[14px]">
                                        <p>username</p>
                                        <span className="mx-[5px]">|</span>
                                        <span>작성날짜</span>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>

            <div className="w-full h-[10px] bg-gray-200 my-[64px]"></div>

            <div className="text-[16px] my-[32px] mx-[200px] pt-[10px] mb-[40px]">
                <div onClick={()=>{openModal('ProductInformation')}} className="flex justify-between items-center h-[55px] px-[5px] font-bold border-b border-black">
                    <span>상품 고시 정보</span>
                    <FontAwesomeIcon className="h-[16px] w-[16px] text-[16px]" icon={faChevronRight} />
                </div>
                <div onClick={()=>{openModal('DeliveryInformationComponent')}} className="flex justify-between items-center h-[55px] px-[5px] font-bold  border-b border-black">
                    <span>배송 안내</span>
                    <FontAwesomeIcon className="h-[16px] w-[16px] text-[16px]" icon={faChevronRight} />
                </div>
                <div onClick={()=>{openModal('RefundInformationComponent')}} className="flex justify-between items-center h-[55px] px-[5px] font-bold  border-b border-black">
                    <span>교환 / 환불 안내</span>
                    <FontAwesomeIcon className="h-[16px] w-[16px] text-[16px]" icon={faChevronRight} />
                </div>
                <div onClick={()=>{openModal('CardInstallmentComponent')}} className="flex justify-between items-center h-[55px] px-[5px] font-bold  border-b border-black">
                    <span>1월 무이자 카드 할부 안내</span>
                    <FontAwesomeIcon className="h-[16px] w-[16px] text-[16px]" icon={faChevronRight} />
                </div>
            </div>
        </div>
    );
}