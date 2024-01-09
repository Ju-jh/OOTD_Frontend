// CSR (Client Side Rendering) Component
// 이기웅 작성.

'use client'

import { EVENT_COLOR, STAR_COLOR } from "@/constants/color";
import { useState } from "react";

export default function ItemReviewComponent() {

    const [isReview, setIsReview] = useState<{ star: number, comment: string }[]>([{ star: 0, comment: "" }]);

    const review = [{ star: 4, comment: "1" }, { star: 4, comment: "2" }, { star: 4, comment: "3" }, { star: 4, comment: "4" }]

    return (
        <div className="text-[16px] my-[32px] mx-[200px]">
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
                                        <div style={{ color: STAR_COLOR }} className={`absolute h-[20px] text-[20px] w-[${value.star*20}%] overflow-hidden`}>★★★★★</div>
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
            <div></div>
        </div>
    );
}