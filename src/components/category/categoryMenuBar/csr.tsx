// CSR (Client Side Rendering) Component
// 이기웅 작성.

'use client'

import { faCaretDown, faCaretUp, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function CategoryMenuBarComponent() {

    const [isCategory, setIsCategory] = useState(false)
    const [isBrand, setIsBrand] = useState(false)
    const [isPrice, setIsPrice] = useState(false)
    const [isDiscount, setIsDiscount] = useState(false)

    const meueBarHidden = (barNumber: number) => {
        if (barNumber == 1) {
            setIsCategory(!isCategory)
            setIsBrand(false)
            setIsPrice(false)
            setIsDiscount(false)
        } else if (barNumber == 2) {
            setIsCategory(false)
            setIsBrand(!isBrand)
            setIsPrice(false)
            setIsDiscount(false)
        } else if (barNumber == 3) {
            setIsCategory(false)
            setIsBrand(false)
            setIsPrice(false)
            setIsDiscount(!isDiscount)

        } else {
            setIsCategory(false)
            setIsBrand(false)
            setIsPrice(!isPrice)
            setIsDiscount(false)
        }
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
        <div className="w-[25%] bg-blue-200 text-[15px]">
            <div className="bg-green-200 w-full border-y border-gray-400">
                <div className="flex justify-between" onClick={() => meueBarHidden(1)}>
                    <div className="py-[15px] font-bold">
                        카테고리
                    </div>
                    {isCategory == true ? <FontAwesomeIcon className="py-[15px]" icon={faChevronUp} /> : <FontAwesomeIcon className="py-[15px]" icon={faChevronDown} />}
                </div>
                <div className={`${isCategory == false ? "hidden" : ""}`}>
                    <ul>
                        <li className="mb-[20px]">outer</li>
                        <li className="mb-[20px]">top</li>
                        <li className="mb-[20px]">pants</li>
                        <li className="mb-[20px]">shoes</li>
                        <li className="mb-[20px]">hat</li>
                        <li className="mb-[20px]">bag</li>
                        <li className="mb-[20px]">accessary</li>
                        <li className="mb-[20px]">headwear</li>
                        <li className="mb-[20px]">onepiece</li>
                        <li className="mb-[20px]">skirt</li>
                        <li className="mb-[20px]">socks</li>
                        <li className="mb-[20px]">sports</li>
                        <li className="mb-[20px]">underwear</li>
                    </ul>
                </div>
            </div>
            <div className="bg-yellow-200 w-full border-b border-gray-400">
                <div className="flex justify-between" onClick={() => meueBarHidden(2)}>
                    <div className="py-[15px] font-bold">
                        브렌드
                    </div>
                    {isBrand == true ? <FontAwesomeIcon className="py-[15px]" icon={faChevronUp} /> : <FontAwesomeIcon className="py-[15px]" icon={faChevronDown} />}
                </div>
                <div className={`${isBrand == false ? "hidden" : ""}`}>
                    <input type="text" name="" value="1" />
                </div>
            </div>
            <div className="bg-green-200 w-full border-b border-gray-400">
                <div className="flex justify-between" onClick={() => meueBarHidden(3)}>
                    <div className="py-[15px] font-bold">
                        가격
                    </div>
                    {isDiscount == true ? <FontAwesomeIcon className="py-[15px]" icon={faChevronUp} /> : <FontAwesomeIcon className="py-[15px]" icon={faChevronDown} />}
                </div>
                <div className={`${isDiscount == false ? "hidden" : ""}`}>
                    <div className="flex mt-[5px] mb-[30px]">
                        <div className="ml-[15px] py-[15px] pr-[3px] bg-gray-200">
                            <button className="flex">
                                <span className="min-w-[106px] h-[16px] text-[13px] text-left">
                                    최저가
                                </span>
                                <div className="w-[16px] h-[16px]">
                                    <FontAwesomeIcon icon={faCaretUp} />
                                    {/* <FontAwesomeIcon icon={faCaretDown} /> */}
                                </div>
                            </button>
                            <ul className="hidden">
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
                        <span className="mx-[3px]">~</span>
                        <div className="mr-[15px] bg-gray-200">
                            <button className="flex">
                                <span className="min-w-[106px] h-[16px] text-[13px] text-left">
                                    최고가
                                </span>
                                <div className="w-[16px] h-[16px]">
                                    <FontAwesomeIcon icon={faCaretUp} />
                                    {/* <FontAwesomeIcon icon={faCaretDown} /> */}
                                </div>
                            </button>
                            <ul className="hidden">
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
            <div className="bg-yellow-200 w-full border-b border-gray-400">
                <div className="flex justify-between" onClick={() => meueBarHidden(4)}>
                    <div className="py-[15px] font-bold">
                        할인율
                    </div>
                    {isPrice == true ? <FontAwesomeIcon className="py-[15px]" icon={faChevronUp} /> : <FontAwesomeIcon className="py-[15px]" icon={faChevronDown} />}
                </div>
                <div className={`flex flex-col ${isPrice == false ? "hidden" : ""}`}>
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