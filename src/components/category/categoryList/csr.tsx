// CSR (Client Side Rendering) Component
// 이기웅 작성.

'use client'

import { EVENT_COLOR } from "@/constants/color";
import { faChevronLeft, faChevronRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CategoryListComponent(categoryList: any) {

    const [isHeart, setIsHeart] = useState(false)
    const [isPageNumber, setIsPageNumber] = useState(0)
    const category = categoryList.categoryList
    const categoryPage = []
    const page = []
    const [startPage, setStartPage] = useState(0)

    for (let i = 0; i < Math.ceil(category.length / 20); i++) {
        categoryPage.push(category.slice(0 + i * 20, 20 + i * 20))
        page.push(i)
    }

    const pageBtn = (page: number) => {
        setIsPageNumber(page)
    }

    const nextBtn = () => {
        setStartPage(startPage + 5)
    }

    const prevBtn = () => {
        if (startPage != 1) {
            setStartPage(startPage - 5)
        }
    }

    return (
        <div className="w-[65%]">
            <ul className="flex flex-wrap w-full">
                {categoryPage[isPageNumber].map((value: any, index: any) => {
                    return (
                        <Link className="min-w-[160px] min-h-[280px] w-[25%] pr-[5%]" key={index} href={`/detail/${value.i_id}`}>
                            <div className="relative h-[60%]">
                                <div className="absolute opacity-10 rounded-lg bg-gray-500 w-full h-full z-20 "></div>
                                <Image src={value.photo ? value.photo : "/images/images.jpg"} alt={""} layout={"fill"} />
                                <div className="absolute z-30 bottom-2 right-2">
                                    <button onClick={(e) => { e.preventDefault(); setIsHeart(!isHeart) }}>
                                        <FontAwesomeIcon className={`h-[16px] w-[16px] text-[16px] ${isHeart ? "text-blue-300" : "text-red-500"}`} icon={faHeart} />
                                    </button>
                                </div>
                            </div>
                            <div className="w-full text-[14px] h-[30%]">
                                <p className="font-bold">
                                    {value.brand}
                                </p>
                                <p className="truncate">
                                    {value.title}
                                </p>
                                <div className="text-[16px] font-bold">
                                    <span className="mr-[5px]" style={{ color: EVENT_COLOR }}>{Math.round(parseInt(value.discount) / parseInt(value.price) * 100) + "%"}</span>
                                    <span>{(parseInt(value.price) - parseInt(value.discount)).toLocaleString() + "원"}</span>
                                </div>
                                <div className="">익일 배송, 가격비교</div>
                            </div>
                        </Link>
                    )
                })}
            </ul>
            <div className="flex justify-center items-center bg-gray-500 w-full h-[30px] my-[30px] ">
                <button onClick={prevBtn} className="w-[36px] h-[36px] text-[14px]">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <div className="flex ">
                    {page.slice(startPage, 5 + startPage).map((value) => {
                        return (
                            <button key={value} onClick={e => pageBtn(value)} className={`w-[36px] h-[36px] text-[14px]`}>{value + 1}</button>
                        )
                    })}
                </div>
                <button onClick={nextBtn} className="w-[36px] h-[36px] text-[14px]">
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
}