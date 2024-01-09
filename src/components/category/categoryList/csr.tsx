// CSR (Client Side Rendering) Component
// 이기웅 작성.

'use client'

import { EVENT_COLOR } from "@/constants/color";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useState } from "react";

export default function CategoryListComponent() {

    const [isList, setIsList] = useState([])
    const [isHeart, setIsHeart] = useState(false)

    const categoryList = [1, 2, 3, 4, 5, 6]

    const handleLikeClick = (e: any) => {
        e.preventDefault();
    };

    return (
        <div className="w-[65%]">
            <ul className="flex flex-wrap w-full">
                {categoryList.map((value, index) => {
                    return (
                        <Link className="relative min-w-[160px] min-h-[280px] w-[20%] pr-[5%]" key={index} href={`/detail/${value}`}>
                            <div className="relative h-[60%] rounded-lg">
                                <Image className="bg-gray-200" src={"/images/images.jpg"} alt={""} layout={"fill"} />
                                <div onClick={e => handleLikeClick(e)}>
                                    <button className="absolute z-50 bottom-2 right-2" onClick={(e) => { setIsHeart(!isHeart) }}>
                                        <FontAwesomeIcon className={`h-[16px] w-[16px] text-[16px] ${isHeart ? "text-blue-300" : "text-red-500"}`} icon={faHeart} />
                                    </button>
                                </div>
                            </div>
                            <div className="w-full text-[14px] h-[30%]">
                                <p className="font-bold">
                                    브렌드
                                </p>
                                <p className="truncate">
                                    상품이름
                                </p>
                                <div className="text-[16px] font-bold">
                                    <span className="mr-[5px]" style={{ color: EVENT_COLOR }}>50%</span>
                                    <span>{"123,000" + "원"}</span>
                                </div>
                                <div className="">익일 배송, 가격비교</div>
                            </div>
                        </Link>
                    )

                })}
            </ul>
            <Link href={"/detail/1"}>상세 페이지</Link>
        </div>
    );
}