// CSR (Client Side Rendering) Component
// 이기웅 작성.

'use client'

import { EVENT_COLOR } from "@/constants/color";
import { GET_ITEM_LIKE, PRESS_LIKE_BUTTON } from '@/constants/endpoint';
import { useDarkMode } from '@/hooks/context/darkMode';
import { faChevronLeft, faChevronRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


type Data = {
    categoryname: string
    category: [
        { i_id: string }
    ];
    page: string
    totalpage: number
}

export default function CategoryListComponent({ categoryname, category, page, totalpage }: Data) {
    
    const { darkMode } = useDarkMode()
    const [items, setItems] = useState(category)
    const [heartStates, setHeartStates] = useState(category.map(() => false));
    const [isPageNumber, setIsPageNumber] = useState(parseInt(page))
    const [startPage, setStartPage] = useState(0)
    const [isApiCompleted, setIsApiCompleted] = useState(false)
    const pageList = []


    for (let i = 0; i < totalpage; i++) {
        pageList.push(i)
    }

    const pageBtn = (page: number) => {
        setIsPageNumber(page)
    }

    const nextBtn = () => {
        if (5 + startPage + 5 * Math.floor(isPageNumber / 5) < totalpage) {
            setStartPage(startPage + 5)
        }
    }

    const prevBtn = () => {
        if (startPage + 5 * Math.floor(isPageNumber / 5) > 0) {
            setStartPage(startPage - 5)
        }
    }

    const clickLikeButton = (itemId: number) => {
        axios
        .post(PRESS_LIKE_BUTTON, {itemId}, {
            headers: {
            "Content-Type": "application/json",
            },
            withCredentials: true,
        })
        .then(() => {
            setHeartStates
        })
    }

    const getItemLike = (iIds: any) => {
        axios
        .post(GET_ITEM_LIKE, {iIds}, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
        .then((response) => {
            setHeartStates(response.data.results)

        })
    }

    useEffect(() => {
        const iIds = (category.map((item) => item.i_id))
        getItemLike(iIds)
            console.log(category)

    },[category])

    return (
        <div className="w-[65%]">
            <ul className="flex flex-wrap w-full">
                {items.map((value: any, index: any) => {
                    return (
                        <div className="min-w-[160px] min-h-[280px] w-[25%] pr-[5%]" key={index}>
                            <Link href={`/category/${categoryname}/item/${value.i_id}`}>
                                <div className="relative h-[60%]">
                                    <div className={`w-full h-full hover:rounded-2xl overflow-hidden transition-all border`} style={{ borderColor: darkMode ? 'transparent' : '' }}>
                                        <Image  src={value.photo ? value.photo : "/images/images.jpg"} alt={""} width={300} height={300} style={{ objectFit: 'cover', width: '100%', height: '100%'}}/>
                                    </div>
                                    <div className="absolute z-30 bottom-2 right-2">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const updatedHeartStates = [...heartStates];
                                            updatedHeartStates[index] = !updatedHeartStates[index];
                                            setHeartStates(updatedHeartStates);
                                            clickLikeButton(value.i_id)
                                        }}
                                        >
                                        <FontAwesomeIcon
                                            className={`h-[16px] w-[16px] text-[16px] ${
                                            heartStates[index] ? "text-red-500" : "text-blue-300"
                                            }`}
                                            icon={faHeart}
                                        />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                            <div className="w-full text-[14px] h-[30%] pt-[10px]">
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
                        </div>
                    )
                })}
            </ul>
            <div className="flex justify-center items-center w-full h-[30px] my-[30px] ">
                <button onClick={prevBtn} className="w-[36px] h-[36px] text-[14px]">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <div className="flex ">
                    {pageList.slice(isPageNumber % 5 == 0 ? isPageNumber - 5 : startPage + 5 * Math.floor(isPageNumber / 5), isPageNumber % 5 == 0 ? 5 * (isPageNumber / 5) : 5 + startPage + 5 * Math.floor(isPageNumber / 5)).map((value) => {
                        return (
                            <Link key={value} href={`/category/${categoryname}/${value + 1}`}>
                                <button style={value + 1 === isPageNumber ? { color: EVENT_COLOR } : { color: "" }} onClick={e => pageBtn(value)} className={`w-[36px] h-[36px] text-[14px]`}>{value + 1}</button>
                            </Link>
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