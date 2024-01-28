// CSR (Client Side Rendering) Component
// 이기웅 작성.

'use client'

import { faCaretDown, faCaretUp, faChevronDown, faChevronUp, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export default function CategoryMenuBarComponent() {
    const [isCategory, setIsCategory] = useState(false)
    const [isBrand, setIsBrand] = useState(false)
    const [isPrice, setIsPrice] = useState(false)
    const [isDiscount, setIsDiscount] = useState(false)
    const [isHighestPrice, setIsHighestPrice] = useState(false)
    const [isLowestPrice, setIsLowestPrice] = useState(false)

    const categoryBtn = () => {
        setIsCategory(!isCategory)
    }

    const brandBtn = () => {
        setIsBrand(!isBrand)
    }

    const discountBtn = () => {
        setIsDiscount(!isDiscount)
    }

    const priceBtn = () => {
        setIsPrice(!isPrice)
    }

    const highestBtn = () => {
        setIsHighestPrice(!isHighestPrice)
    }

    const highestPriceBtn = () => {

    }

    const lowestBtn = () => {
        setIsLowestPrice(!isLowestPrice)
    }

    const lowestPriceBtn = () => {

    }

    const priceCheackBox = (target: EventTarget) => {
        const checkboxes = document.getElementsByName('price') as NodeListOf<HTMLInputElement>;
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] !== target) {
                checkboxes[i].checked = false;
            }
        }
    }


    return (
        <div className="w-[25%] text-[15px]">
            <div className="w-full border-y border-gray-400">
                <div className="flex justify-between px-[10px]" onClick={categoryBtn}>
                    <div className="py-[15px] font-bold">
                        카테고리
                    </div>
                    {isCategory ? <FontAwesomeIcon className="py-[15px] w-[15px] h-[15px]" icon={faChevronUp} /> : <FontAwesomeIcon className="py-[15px] w-[15px] h-[15px]" icon={faChevronDown} />}
                </div>
                <div className={`overflow-hidden transition-all duration-500 ${isCategory ? 'max-h-[700px]' : 'max-h-0'}`}>                    <ul className="ml-[10px]">
                    <Link href={"/category/outer"}>
                        <li className="mb-[20px]">outer</li>
                    </Link>
                    <Link href={"/category/top"}>
                        <li className="mb-[20px]">top</li>
                    </Link>
                    <Link href={"/category/pants"}>
                        <li className="mb-[20px]">pants</li>
                    </Link>
                    <Link href={"/category/shoes"}>
                        <li className="mb-[20px]">shoes</li>
                    </Link>
                    <Link href={"/category/hat"}>
                        <li className="mb-[20px]">hat</li>
                    </Link>
                    <Link href={"/category/bag"}>
                        <li className="mb-[20px]">bag</li>
                    </Link>
                    <Link href={"/category/accessary"}>
                        <li className="mb-[20px]">accessary</li>
                    </Link>
                    <Link href={"/category/headwear"}>
                        <li className="mb-[20px]">headwear</li>
                    </Link>
                    <Link href={"/category/onepiece"}>
                        <li className="mb-[20px]">onepiece</li>
                    </Link>
                    <Link href={"/category/skirt"}>
                        <li className="mb-[20px]">skirt</li>
                    </Link>
                    <Link href={"/category/socks"}>
                        <li className="mb-[20px]">socks</li>
                    </Link>
                    <Link href={"/category/sports"}>
                        <li className="mb-[20px]">sports</li>
                    </Link>
                    <Link href={"/category/underwear"}>
                        <li className="mb-[20px]">underwear</li>
                    </Link>
                </ul>
                </div>
            </div>
            <div className="w-full border-b border-gray-400">
                <div className="flex justify-between px-[10px]" onClick={brandBtn}>
                    <div className="py-[15px] font-bold">
                        브렌드
                    </div>
                    {isBrand ? <FontAwesomeIcon className="py-[15px] w-[15px] h-[15px]" icon={faChevronUp} /> : <FontAwesomeIcon className="py-[15px] w-[15px] h-[15px]" icon={faChevronDown} />}
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${isBrand ? 'max-h-[700px]' : 'max-h-0'}`}>
                    <div className="py-[10px] pl-[10px] my-[10px] bg-gray-100">
                        <input className="w-[85%] bg-gray-100 text-black placeholder:italic border border-gray-100 focus:outline-none" placeholder="ex) 구찌" type="text" name="" />
                        <FontAwesomeIcon style={{ color: "#dddfe2" }} className="ml-[5px] w-[15px] h-[15px] bg-gray-100" icon={faMagnifyingGlass} />
                    </div>
                </div>
            </div>
            <div className="w-full border-b border-gray-400">
                <div className="flex justify-between px-[10px]" onClick={discountBtn}>
                    <div className="py-[15px] font-bold">
                        가격
                    </div>
                    {isDiscount ? <FontAwesomeIcon className="py-[15px] w-[15px] h-[15px]" icon={faChevronUp} /> : <FontAwesomeIcon className="py-[15px] w-[15px] h-[15px]" icon={faChevronDown} />}
                </div>
                <div className={`transition-all duration-300 ${isDiscount ? 'max-h-[700px]' : 'overflow-hidden max-h-0'}`}>
                    <div className="flex justify-between mt-[5px] mb-[15px]">
                        <div className="relative min-w-[50px] w-[40%] h-[40px] ml-[10px] py-[10px] bg-gray-200">
                            <button className="flex justify-between h-[100%] w-[100%]" onClick={lowestBtn}>
                                <span className="h-[16px] text-[13px] text-left text-black">
                                    최저가
                                </span>
                                <div className="w-[16px] h-[16px] text-black pr-[3px]">
                                    {isLowestPrice ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
                                </div>
                            </button>
                            <ul className={`overflow-y-scroll transition-all duration-500 ${isLowestPrice ? 'max-h-[200px]' : 'max-h-0 hidden'} mt-[10px] pr-[3px] max-h-[200px] bg-gray-200 text-black`}>
                                <li>산택안함</li>
                                <li>10만</li>
                                <li>20만</li>
                                <li>30만</li>
                                <li>50만</li>
                                <li>70만</li>
                                <li>100만</li>
                                <li>130만</li>
                                <li>150만</li>
                                <li>200만</li>
                                <li>300만</li>
                                <li>500만</li>
                            </ul>
                        </div>
                        <span className="py-[15px]">~</span>
                        <div className="min-w-[50px] w-[40%] h-[40px] mr-[10px] py-[10px] bg-gray-200">
                            <button className="flex justify-between h-[100%] w-[100%]" onClick={highestBtn}>
                                <span className="h-[16px] text-[13px] text-left text-black ml-[3px]">
                                    최고가
                                </span>
                                <div className="w-[16px] h-[16px] pr-[3px] text-black">
                                    {isHighestPrice ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
                                </div>
                            </button>
                            <ul className={`relative z-1 overflow-y-scroll transition-all duration-200 ${isHighestPrice ? 'max-h-[200px]' : 'max-h-0 hidden'} mt-[10px] w-full pr-[3px] max-h-[200px] bg-gray-200 text-black`}>
                                <li>10만</li>
                                <li>20만</li>
                                <li>30만</li>
                                <li>50만</li>
                                <li>70만</li>
                                <li>100만</li>
                                <li>130만</li>
                                <li>150만</li>
                                <li>200만</li>
                                <li>300만</li>
                                <li>500만</li>
                                <li>산택안함</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full border-b border-gray-400">
                <div className="flex justify-between px-[10px]" onClick={priceBtn}>
                    <div className="py-[15px] font-bold">
                        할인율
                    </div>
                    {isPrice ? <FontAwesomeIcon className="py-[15px] w-[15px] h-[15px]" icon={faChevronUp} /> : <FontAwesomeIcon className="py-[15px] w-[15px] h-[15px]" icon={faChevronDown} />}
                </div>
                <div className={`flex flex-col overflow-hidden transition-all duration-300 ${isPrice ? 'max-h-[700px]' : 'max-h-0'}`}>
                    <div>
                        <input onClick={(e) => priceCheackBox(e.target)} type="checkbox" name="price" value="1" />30%이하 세일
                    </div>
                    <div>
                        <input onClick={(e) => priceCheackBox(e.target)} type="checkbox" name="price" value="2" />30% ~ 50% 세일
                    </div>
                    <div>
                        <input onClick={(e) => priceCheackBox(e.target)} type="checkbox" name="price" value="3" />50% ~ 70% 세일
                    </div>
                    <div>
                        <input onClick={(e) => priceCheackBox(e.target)} type="checkbox" name="price" value="4" />70%이상 세일
                    </div>
                </div>
            </div>
        </div>
    );
}